import { notFound } from "next/navigation"
import { BlogContent } from "@/components/blog-content"
import { AuthorCard } from "@/components/author-card"
import { VotingControls } from "@/components/voting-controls"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedPosts } from "@/components/related-posts"
import { CommentSection } from "@/components/comment-section"
import { serverBlogApi } from "@/lib/api-server"
import { serverCommentApi } from "@/lib/api-server"
import type { BlogPost } from "@/lib/types"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = await serverBlogApi.getBySlug(slug)

  if (!blog) {
    notFound()
  }

  // Increment view count (this will be done in the background)
  // Temporarily disabled due to API issues
  // try {
  //   await serverBlogApi.incrementViews(blog.id)
  // } catch (error) {
  //   console.error('Failed to increment views:', error)
  // }

  // Fetch comments server-side
  const comments = await serverCommentApi.getByBlog(blog.id)

  return (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{blog.title}</h1>

          <div className="flex items-center justify-between mb-6">
            {blog.author && (
              <AuthorCard author={blog.author} publishedAt={blog.createdAt} />
            )}
            <div className="flex items-center gap-4">
              {blog.readingTime && (
                <span className="text-sm text-muted-foreground">{blog.readingTime} min read</span>
              )}
              <VotingControls blogId={blog.id} upvotes={blog.upvotes} />
            </div>
          </div>

          {blog.coverImage && (
            <div className="mb-8">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <BlogContent content={blog.content} />

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.category && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {blog.category.name}
              </span>
            )}
            {blog.tags.map((tag) => (
              <span key={tag.id} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                {tag.name}
              </span>
            ))}
          </div>

          <ShareButtons url={`/blog/${blog.slug}`} title={blog.title} />
        </footer>
      </article>

      {/* Comments Section */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <CommentSection blogId={blog.id} blogDocumentId={blog.documentId} initialComments={comments} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <RelatedPosts currentBlogId={blog.id} tags={blog.tags} />
      </div>
    </div>
  )
}
