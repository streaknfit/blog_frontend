"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { BlogCardSkeleton } from "@/components/blog-card-skeleton"
import { blogApi } from "@/lib/api"
import { mockBlogs } from "@/lib/mock-data"
import type { BlogPost } from "@/lib/types"

interface BlogFeedProps {
  blogs: BlogPost[]
}

export function BlogFeed({ blogs }: BlogFeedProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-foreground mb-2">No blogs found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria.
        </p>
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
