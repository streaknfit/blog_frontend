"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { BlogCardSkeleton } from "@/components/blog-card-skeleton"
import { mockBlogs } from "@/lib/mock-data"
import type { BlogPost } from "@/lib/types"

interface BlogFeedProps {
  filter?: string
  search?: string
  tag?: string
}

export function BlogFeed({ filter, search, tag }: BlogFeedProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setLoading(true)

    setTimeout(() => {
      let filteredBlogs = [...mockBlogs]

      // Apply search filter
      if (search) {
        filteredBlogs = filteredBlogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.summary.toLowerCase().includes(search.toLowerCase()) ||
            blog.author.name.toLowerCase().includes(search.toLowerCase()),
        )
      }

      // Apply tag filter
      if (tag) {
        filteredBlogs = filteredBlogs.filter((blog) => blog.tags.some((t) => t.slug === tag))
      }

      // Apply sort filter
      switch (filter) {
        case "trending":
          filteredBlogs.sort((a, b) => b.upvotes + b.readCount - (a.upvotes + a.readCount))
          break
        case "hot":
          filteredBlogs.sort((a, b) => {
            const aScore = b.upvotes + (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24)
            const bScore = a.upvotes + (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60 * 24)
            return bScore - aScore
          })
          break
        case "latest":
          filteredBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case "featured":
          filteredBlogs = filteredBlogs.filter((blog) => blog.isFeatured)
          break
        default:
          // Default to latest
          filteredBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }

      setBlogs(filteredBlogs)
      setLoading(false)
    }, 500)
  }, [filter, search, tag])

  if (loading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-foreground mb-2">No blogs found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
