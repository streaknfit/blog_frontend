import { BlogCard } from "@/components/blog-card"
import { mockBlogs } from "@/lib/mock-data"
import type { Tag } from "@/lib/types"

interface RelatedPostsProps {
  currentBlogId: string
  tags: Tag[]
}

export function RelatedPosts({ currentBlogId, tags }: RelatedPostsProps) {
  const tagIds = tags.map((tag) => tag.id)

  const relatedPosts = mockBlogs
    .filter((blog) => blog.id !== currentBlogId && blog.tags.some((tag) => tagIds.includes(tag.id)))
    .slice(0, 3)

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
