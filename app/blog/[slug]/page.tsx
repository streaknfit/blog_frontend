import { notFound } from "next/navigation"
import { BlogContent } from "@/components/blog-content"
import { AuthorCard } from "@/components/author-card"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedPosts } from "@/components/related-posts"
import { CommentSection } from "@/components/comment-section"
import { Eye } from "lucide-react"
import { serverBlogApi } from "@/lib/api-server"
import { serverCommentApi } from "@/lib/api-server"
import { generateMetadata as generateSEOMetadata, generateStructuredData } from "@/components/seo"
import type { BlogPost } from "@/lib/types"
import type { Metadata } from "next"

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await serverBlogApi.getBySlug(slug)
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }
  
  return generateSEOMetadata({ blog, type: 'article' })
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

  // Generate structured data for SEO
  const structuredData = generateStructuredData(blog)

  return (
    <div className="bg-background">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
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
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{blog.views || 0} views</span>
              </div>
            </div>
          </div>


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
