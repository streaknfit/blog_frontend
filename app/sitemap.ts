import { MetadataRoute } from 'next'
import { serverBlogApi, serverCategoryApi, serverTagApi } from '@/lib/api-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://streaknfit.com'
  
  // Get all blogs
  const blogsResult = await serverBlogApi.getAll({
    pageSize: 1000, // Get all blogs
    populate: '*',
  })
  
  // Get all categories
  const categories = await serverCategoryApi.getAll()
  
  // Get all tags
  const tags = await serverTagApi.getAll()
  
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]
  
  // Add blog posts
  blogsResult.blogs.forEach((blog) => {
    sitemap.push({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })
  
  // Add category pages
  categories.forEach((category) => {
    sitemap.push({
      url: `${baseUrl}/?category=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })
  
  // Add tag pages
  tags.forEach((tag) => {
    sitemap.push({
      url: `${baseUrl}/?tag=${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  })
  
  return sitemap
} 