import type { 
  BlogPost, 
  Category, 
  Tag, 
  User, 
  Comment
} from './types'

const STRAPI_BASE_URL = 'https://backend.blog.streaknfit.com'
const STRAPI_READ_TOKEN = process.env.STRAPI_READ_TOKEN
const STRAPI_WRITE_TOKEN = process.env.STRAPI_WRITE_TOKEN

// Helper function to get full URL for media
const getMediaUrl = (url: string): string => {
  if (url.startsWith('http')) return url
  return `${STRAPI_BASE_URL}${url}`
}

// Helper function to transform blog data to frontend format
const transformBlog = (blogData: any): BlogPost => {
  if (!blogData) {
    throw new Error('Invalid blog data structure')
  }
  
  return {
    id: blogData.id,
    title: blogData.title || 'Untitled',
    slug: blogData.slug || `blog-${blogData.id}`,
    content: blogData.content || '',
    coverImage: blogData.coverImage?.url 
      ? getMediaUrl(blogData.coverImage.url)
      : undefined,
    excerpt: blogData.excerpt || '',
    readingTime: blogData.readingTime || 0,
    featured: blogData.featured || false,
    views: blogData.views || 0,
    upvotes: blogData.upvotes || 0,
    createdAt: blogData.createdAt || new Date().toISOString(),
    updatedAt: blogData.updatedAt || new Date().toISOString(),
    publishedAt: blogData.publishedAt || new Date().toISOString(),
    category: blogData.category ? {
      id: blogData.category.id,
      name: blogData.category.name,
      slug: blogData.category.slug,
      description: blogData.category.description,
      icon: blogData.category.icon
    } : undefined,
    tags: blogData.tags?.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug
    })) || [],
    author: blogData.author ? {
      id: blogData.author.id,
      username: blogData.author.username,
      email: blogData.author.email,
      confirmed: blogData.author.confirmed,
      blocked: blogData.author.blocked,
      createdAt: blogData.author.createdAt,
      updatedAt: blogData.author.updatedAt
    } : undefined,
    comments: blogData.comments?.map((comment: any) => ({
      id: comment.id,
      name: comment.name,
      email: comment.email,
      approved: comment.approved,
      message: comment.message,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    })) || [],
    seo: blogData.seo,
    relatedPosts: blogData.relatedBlogs?.map((blog: any) => transformBlog(blog)) || []
  }
}

// Server-side API request function
const serverApiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {},
  useWriteToken = false
): Promise<T> => {
  const url = `${STRAPI_BASE_URL}/api${endpoint}`
  const token = useWriteToken ? STRAPI_WRITE_TOKEN : STRAPI_READ_TOKEN
  
  if (!token) {
    throw new Error('API token not configured')
  }

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Server API request error:', error)
    throw error
  }
}

// Server-side Blog API functions
export const serverBlogApi = {
  // Get all blogs with optional filters
  getAll: async (params?: {
    page?: number
    pageSize?: number
    sort?: string
    filters?: Record<string, any>
    populate?: string
  }): Promise<{ blogs: BlogPost[], pagination: any }> => {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    if (params?.populate) searchParams.append('populate', params.populate)
    
    // Add filters
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, value.toString())
      })
    }
    
    const endpoint = `/blogs?${searchParams.toString()}`
    const response = await serverApiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) {
      return { blogs: [], pagination: null }
    }
    
    try {
      const blogs = response.data.map(transformBlog)
      return {
        blogs,
        pagination: response.meta?.pagination || null
      }
    } catch (error) {
      console.error('Error transforming blog data:', error)
      return { blogs: [], pagination: null }
    }
  },

  // Get blog by slug
  getBySlug: async (slug: string): Promise<BlogPost | null> => {
    const endpoint = `/blogs?filters[slug][$eq]=${slug}&populate=*`
    const response = await serverApiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data || response.data.length === 0) return null
    
    try {
      return transformBlog(response.data[0])
    } catch (error) {
      console.error('Error transforming blog data:', error)
      return null
    }
  },

  // Get featured blogs
  getFeatured: async (limit = 5): Promise<BlogPost[]> => {
    const endpoint = `/blogs?filters[featured][$eq]=true&pagination[pageSize]=${limit}&populate=*&sort=createdAt:desc`
    const response = await serverApiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    try {
      return response.data.map(transformBlog)
    } catch (error) {
      console.error('Error transforming featured blog data:', error)
      return []
    }
  },

  // Increment views
  incrementViews: async (blogId: number): Promise<void> => {
    const endpoint = `/blogs/${blogId}`
    await serverApiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          views: { $increment: 1 }
        }
      })
    }, true)
  }
}

// Server-side Category API functions
export const serverCategoryApi = {
  getAll: async (): Promise<Category[]> => {
    const endpoint = '/categories?populate=*'
    const response = await serverApiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    return response.data.map((categoryData) => ({
      id: categoryData.id,
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description,
      icon: categoryData.icon
    }))
  }
}

// Server-side Tag API functions
export const serverTagApi = {
  getAll: async (): Promise<Tag[]> => {
    const endpoint = '/tags?populate=*'
    const response = await serverApiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    return response.data.map((tagData) => ({
      id: tagData.id,
      name: tagData.name,
      slug: tagData.slug
    }))
  }
} 