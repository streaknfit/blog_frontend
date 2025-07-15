export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  body: string
  summary: string
  coverImage?: string
  tags: Tag[]
  author: Author
  createdAt: string
  updatedAt: string
  upvotes: number
  downvotes: number
  readCount: number
  readTime: number
  isFeatured: boolean
}
