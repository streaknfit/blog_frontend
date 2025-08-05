import Link from "next/link"
import { Calendar, Clock, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BlogImage } from "@/components/blog-image"
import { NavigationLink } from "@/components/navigation-link"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  blog: BlogPost
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-border">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 md:flex-shrink-0">
          <NavigationLink href={`/blog/${blog.slug}`}>
            <BlogImage
              src={blog.coverImageURL || ""}
              alt={blog.title}
              className="w-full h-48 md:h-32 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
              fallbackClassName="w-full h-48 md:h-32 rounded-lg"
            />
          </NavigationLink>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <NavigationLink href={`/blog/${blog.slug}`}>
              <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 font-serif">
                {blog.title}
              </h2>
            </NavigationLink>
            <p className="text-muted-foreground mt-2 line-clamp-3">{blog.excerpt}</p>
          </div>

                      <div className="flex items-center space-x-4">
              {blog.author && (
                <Link
                  href={`/author/${blog.author.id}`}
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.username} />
                    <AvatarFallback>{blog.author.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground">{blog.author.username}</span>
                </Link>
              )}

                              <div className="flex items-center text-xs text-muted-foreground space-x-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                  {blog.readingTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{blog.readingTime} min read</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{blog.views || 0} views</span>
                  </div>
                </div>
            </div>

          <div className="flex flex-wrap gap-2">
            {blog.category && (
              <Link
                href={`/?category=${blog.category.slug}`}
                className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs hover:bg-primary/20 transition-colors"
              >
                {blog.category.name}
              </Link>
            )}
            {blog.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                href={`/?tag=${tag.slug}`}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs hover:bg-secondary/80 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">+{blog.tags.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
