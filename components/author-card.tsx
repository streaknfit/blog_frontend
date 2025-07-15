import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Author } from "@/lib/types"

interface AuthorCardProps {
  author: Author
  publishedAt: string
}

export function AuthorCard({ author, publishedAt }: AuthorCardProps) {
  return (
    <Link href={`/author/${author.id}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
      <Avatar className="h-12 w-12">
        <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-foreground">{author.name}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  )
}
