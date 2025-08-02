"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { blogApi } from "@/lib/api"
import type { Tag, BlogPost } from "@/lib/types"

interface RelatedPostsProps {
  currentBlogId: number
  tags: Tag[]
}

export function RelatedPosts({ currentBlogId, tags }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        setLoading(true)
        
        // Get related posts based on tags
        const tagSlugs = tags.map(tag => tag.slug)
        let allRelatedPosts: BlogPost[] = []
        
        // Fetch posts for each tag
        for (const tagSlug of tagSlugs.slice(0, 2)) { // Limit to first 2 tags to avoid too many requests
          const posts = await blogApi.getAll({
            filters: { 
              tags: { slug: { $eq: tagSlug } },
              id: { $ne: currentBlogId } // Exclude current post
            },
            populate: '*',
            pageSize: 5
          })
          allRelatedPosts.push(...posts.blogs)
        }
        
        // Remove duplicates and limit to 3 posts
        const uniquePosts = allRelatedPosts.filter((post, index, self) => 
          index === self.findIndex(p => p.id === post.id)
        ).slice(0, 3)
        
        setRelatedPosts(uniquePosts)
      } catch (error) {
        console.error('Error fetching related posts:', error)
      } finally {
        setLoading(false)
      }
    }

    if (tags.length > 0) {
      fetchRelatedPosts()
    } else {
      setLoading(false)
    }
  }, [currentBlogId, tags])

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6 font-serif">Related Articles</h2>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-6 font-serif">Related Articles</h2>
      <div className="space-y-6">
        {relatedPosts.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  )
}
