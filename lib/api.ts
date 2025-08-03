import type { 
  StrapiResponse, 
  StrapiData, 
  Blog, 
  BlogPost, 
  Category, 
  Tag, 
  User, 
  Comment,
  ApiConfig 
} from './types'
import { plainTextToRichText } from './utils'

// API Configuration - Now using server-side proxy
const API_CONFIG = {
  baseUrl: '/api/strapi', // This points to our secure proxy
}

// Helper function to get full URL for media
const getMediaUrl = (url: string): string => {
  if (url.startsWith('http')) return url
  return `${process.env.BACKEND_URL}${url}`
}

// Helper function to get base URL for API requests
const getBaseUrl = (): string => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  // Fallback for server-side rendering
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

// Helper function to transform blog data to frontend format
const transformBlog = (blogData: any): BlogPost => {
  // Debug logging
  console.log('Transform blog data:', blogData)
  
  // Handle case where blogData might be undefined or null
  if (!blogData) {
    console.error('Blog data is undefined')
    throw new Error('Invalid blog data structure')
  }
  
  return {
    id: blogData.id,
    documentId: blogData.documentId,
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

// Generic API request function using secure proxy
const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {},
  useWriteToken = false
): Promise<T> => {
  const baseUrl = getBaseUrl()
  const url = new URL(API_CONFIG.baseUrl, baseUrl)
  url.searchParams.append('endpoint', endpoint)
  
  if (useWriteToken) {
    url.searchParams.append('write', 'true')
  }

  // Add security header for all requests (server-side only)
  let headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  if (typeof window === 'undefined' && process.env.INTERNAL_API_SECRET) {
    headers['x-internal-api-secret'] = process.env.INTERNAL_API_SECRET
  }

  const config: RequestInit = {
    headers,
    ...options,
  }

  try {
    console.log('Making secure API request to:', url.toString())
    const response = await fetch(url.toString(), config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API request failed: ${response.status} ${errorData.error || response.statusText}`)
    }
    
    const data = await response.json()
    console.log('API response:', data)
    return data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Blog API functions
export const blogApi = {
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
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    // Handle different response structures
    if (!response.data) {
      console.error('Unexpected API response structure:', response)
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
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
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
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    try {
      return response.data.map(transformBlog)
    } catch (error) {
      console.error('Error transforming featured blog data:', error)
      return []
    }
  },

  // Search blogs
  search: async (query: string, limit = 10): Promise<BlogPost[]> => {
    const endpoint = `/blogs?filters[$or][0][title][$containsi]=${query}&filters[$or][1][content][$containsi]=${query}&filters[$or][2][excerpt][$containsi]=${query}&pagination[pageSize]=${limit}&populate=*&sort=createdAt:desc`
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    try {
      return response.data.map(transformBlog)
    } catch (error) {
      console.error('Error transforming search results:', error)
      return []
    }
  },

  // Increment views
  incrementViews: async (blogId: number): Promise<void> => {
    const endpoint = `/blogs/${blogId}`
    await apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          views: { $increment: 1 }
        }
      })
    }, true)
  },

  // Increment upvotes
  incrementUpvotes: async (blogId: number): Promise<void> => {
    const endpoint = `/blogs/${blogId}`
    await apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          upvotes: { $increment: 1 }
        }
      })
    }, true)
  }
}

// Category API functions
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const endpoint = '/categories?populate=*'
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    return response.data.map((categoryData) => ({
      id: categoryData.id,
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description,
      icon: categoryData.icon
    }))
  },

  getBySlug: async (slug: string): Promise<Category | null> => {
    const endpoint = `/categories?filters[slug][$eq]=${slug}&populate=*`
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data || response.data.length === 0) return null
    
    const categoryData = response.data[0]
    return {
      id: categoryData.id,
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description,
      icon: categoryData.icon
    }
  },

  getBlogsByCategory: async (categorySlug: string, limit = 10): Promise<BlogPost[]> => {
    const endpoint = `/blogs?filters[category][slug][$eq]=${categorySlug}&pagination[pageSize]=${limit}&populate=*&sort=createdAt:desc`
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    try {
      return response.data.map(transformBlog)
    } catch (error) {
      console.error('Error transforming category blog data:', error)
      return []
    }
  }
}

// Tag API functions
export const tagApi = {
  getAll: async (): Promise<Tag[]> => {
    const endpoint = '/tags?populate=*'
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    return response.data.map((tagData) => ({
      id: tagData.id,
      name: tagData.name,
      slug: tagData.slug
    }))
  },

  getBySlug: async (slug: string): Promise<Tag | null> => {
    const endpoint = `/tags?filters[slug][$eq]=${slug}&populate=*`
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data || response.data.length === 0) return null
    
    const tagData = response.data[0]
    return {
      id: tagData.id,
      name: tagData.name,
      slug: tagData.slug
    }
  },

  getBlogsByTag: async (tagSlug: string, limit = 10): Promise<BlogPost[]> => {
    const endpoint = `/blogs?filters[tags][slug][$eq]=${tagSlug}&pagination[pageSize]=${limit}&populate=*&sort=createdAt:desc`
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    try {
      return response.data.map(transformBlog)
    } catch (error) {
      console.error('Error transforming tag blog data:', error)
      return []
    }
  }
}

// Comment API functions
export const commentApi = {
  getByBlog: async (blogId: number): Promise<Comment[]> => {
    const endpoint = `/comments?filters[blog][id][$eq]=${blogId}&filters[approved][$eq]=true&populate=*&sort=createdAt:desc`
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    return response.data.map((commentData) => ({
      id: commentData.id,
      name: commentData.name,
      email: commentData.email,
      approved: commentData.approved,
      message: commentData.message,
      createdAt: commentData.createdAt,
      updatedAt: commentData.updatedAt
    }))
  },

  create: async (comment: {
    name: string
    email: string
    message: string
    blog: number | string
  }): Promise<Comment> => {
    const endpoint = '/comments'
    
    // Convert plain text message to rich text format
    const richTextMessage = plainTextToRichText(comment.message)
    
    const requestBody = {
      data: {
        name: comment.name,
        email: comment.email,
        message: richTextMessage,
        approved: false, // Comments need approval by default
        blog: comment.blog
      }
    }
    
    console.log('Creating comment with data:', requestBody)
    
    const response = await apiRequest<{ data: any }>(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody)
    }, true)
    
    const commentData = response.data
    return {
      id: commentData.id,
      name: commentData.name,
      email: commentData.email,
      approved: commentData.approved,
      message: commentData.message,
      createdAt: commentData.createdAt,
      updatedAt: commentData.updatedAt
    }
  }
}

// User API functions
export const userApi = {
  getById: async (userId: number): Promise<User | null> => {
    const endpoint = `/users/${userId}?populate=*`
    try {
      const response = await apiRequest<{ data: any }>(endpoint)
      const userData = response.data
      return {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        provider: userData.provider,
        confirmed: userData.confirmed,
        blocked: userData.blocked,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      }
    } catch (error) {
      return null
    }
  },

  getBlogsByAuthor: async (userId: number, limit = 10): Promise<BlogPost[]> => {
    const endpoint = `/blogs?filters[author][id][$eq]=${userId}&pagination[pageSize]=${limit}&populate=*&sort=createdAt:desc`
    const response = await apiRequest<{ data: any[], meta: any }>(endpoint)
    
    if (!response.data) return []
    
    try {
      return response.data.map(transformBlog)
    } catch (error) {
      console.error('Error transforming author blog data:', error)
      return []
    }
  }
} 