"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { BlogCardSkeleton } from "@/components/blog-card-skeleton"
import { blogApi } from "@/lib/api"
import { mockBlogs } from "@/lib/mock-data"
import type { BlogPost } from "@/lib/types"

interface BlogFeedProps {
  filter?: string
  search?: string
  tag?: string
  category?: string
}

export function BlogFeed({ filter, search, tag, category }: BlogFeedProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<any>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        setUsingFallback(false)

        let filters: Record<string, any> = {}
        let sort = 'createdAt:desc'

        // Apply search filter
        if (search) {
          // For search, we'll use the search API
          const searchResults = await blogApi.search(search, 20)
          setBlogs(searchResults)
          setPagination(null)
          return
        }

        // Apply tag filter
        if (tag) {
          const tagResults = await blogApi.getAll({
            filters: { tags: { slug: { $eq: tag } } },
            populate: '*',
            pageSize: 20
          })
          setBlogs(tagResults.blogs)
          setPagination(tagResults.pagination)
          return
        }

        // Apply category filter
        if (category) {
          const categoryResults = await blogApi.getAll({
            filters: { category: { slug: { $eq: category } } },
            populate: '*',
            pageSize: 20
          })
          setBlogs(categoryResults.blogs)
          setPagination(categoryResults.pagination)
          return
        }

        // Apply sort filter
        switch (filter) {
          case "trending":
            sort = 'upvotes:desc,views:desc'
            break
          case "hot":
            sort = 'upvotes:desc'
            break
          case "latest":
            sort = 'createdAt:desc'
            break
          case "featured":
            filters.featured = true
            break
          default:
            sort = 'createdAt:desc'
        }

        const result = await blogApi.getAll({
          filters,
          sort,
          populate: '*',
          pageSize: 12
        })

        setBlogs(result.blogs)
        setPagination(result.pagination)
      } catch (err) {
        console.error('Error fetching blogs:', err)
        
        // If API fails, fall back to mock data
        if (!usingFallback) {
          console.log('Falling back to mock data...')
          setUsingFallback(true)
          
          let filteredBlogs = [...mockBlogs]

          // Apply search filter to mock data
          if (search) {
            filteredBlogs = filteredBlogs.filter(
              (blog) =>
                blog.title.toLowerCase().includes(search.toLowerCase()) ||
                blog.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
                blog.author?.username.toLowerCase().includes(search.toLowerCase()),
            )
          }

          // Apply tag filter to mock data
          if (tag) {
            filteredBlogs = filteredBlogs.filter((blog) => blog.tags.some((t) => t.slug === tag))
          }

          // Apply sort filter to mock data
          switch (filter) {
            case "trending":
              filteredBlogs.sort((a, b) => b.upvotes + (b.views || 0) - (a.upvotes + (a.views || 0)))
              break
            case "hot":
              filteredBlogs.sort((a, b) => b.upvotes - a.upvotes)
              break
            case "latest":
              filteredBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              break
            case "featured":
              filteredBlogs = filteredBlogs.filter((blog) => blog.featured)
              break
            default:
              filteredBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          }

          setBlogs(filteredBlogs)
          setPagination(null)
          setError('Using demo data - API connection failed')
        } else {
          setError('Failed to load blogs. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [filter, search, tag, category, usingFallback])

  if (loading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error && blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-foreground mb-2">Error loading blogs</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-foreground mb-2">No blogs found</h3>
        <p className="text-muted-foreground">
          {search ? `No results found for "${search}"` : "Try adjusting your search or filter criteria."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {usingFallback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            ⚠️ Demo mode: Showing sample data. Please configure your Strapi API tokens to see real content.
          </p>
        </div>
      )}
      
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
      
      {pagination && pagination.pageCount > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {pagination.page > 1 && (
              <button 
                onClick={() => {
                  // Handle pagination - you can implement this
                }}
                className="px-3 py-2 border rounded-md hover:bg-muted"
              >
                Previous
              </button>
            )}
            <span className="px-3 py-2 text-muted-foreground">
              Page {pagination.page} of {pagination.pageCount}
            </span>
            {pagination.page < pagination.pageCount && (
              <button 
                onClick={() => {
                  // Handle pagination - you can implement this
                }}
                className="px-3 py-2 border rounded-md hover:bg-muted"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
