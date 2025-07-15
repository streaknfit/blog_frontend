import { notFound } from "next/navigation"
import { BlogContent } from "@/components/blog-content"
import { AuthorCard } from "@/components/author-card"
import { VotingControls } from "@/components/voting-controls"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedPosts } from "@/components/related-posts"
import { mockBlogs } from "@/lib/mock-data"

interface BlogPageProps {
  params: { slug: string }
}

export default function BlogPage({ params }: BlogPageProps) {
  const blog = mockBlogs.find((b) => b.slug === params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">{blog.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <AuthorCard author={blog.author} publishedAt={blog.createdAt} />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{blog.readTime} min read</span>
              <VotingControls blogId={blog.id} upvotes={blog.upvotes} downvotes={blog.downvotes} />
            </div>
          </div>

          {blog.coverImage && (
            <div className="mb-8">
              <img
                src={blog.coverImage || "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}
        </header>

        <BlogContent content={blog.body} />

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span key={tag.id} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                {tag.name}
              </span>
            ))}
          </div>

          <ShareButtons url={`/blog/${blog.slug}`} title={blog.title} />
        </footer>
      </article>

      <div className="container mx-auto px-4 py-8">
        <RelatedPosts currentBlogId={blog.id} tags={blog.tags} />
      </div>
    </div>
  )
}
