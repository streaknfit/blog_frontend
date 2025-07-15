import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTags, mockAuthors } from "@/lib/mock-data"

export function Sidebar() {
  const popularTags = mockTags.slice(0, 8)
  const featuredAuthors = mockAuthors.slice(0, 5)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag.id}
                href={`/?tag=${tag.slug}`}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Featured Authors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredAuthors.map((author) => (
              <Link
                key={author.id}
                href={`/author/${author.id}`}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                  <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{author.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{author.bio}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
