// Strapi API Response Types
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiData<T> {
  id: number
  attributes: T
}

// SEO Component
export interface SEO {
  id?: number
  metaTitle?: string
  metaDescription?: string
  metaImage?: Media
}

// Media Type
export interface Media {
  id?: number
  documentId?: string
  name?: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: {
    thumbnail?: { url: string; width: number; height: number }
    small?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    large?: { url: string; width: number; height: number }
  }
  hash?: string
  ext?: string
  mime?: string
  size?: number
  url: string
  previewUrl?: string
  provider?: string
  provider_metadata?: any
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

// User Type
export interface User {
  id: number
  documentId?: string
  username: string
  email: string
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  createdAt: string
  updatedAt: string
  publishedAt?: string
  blogs?: Blog[]
}

// Tag Type
export interface Tag {
  id: number
  documentId?: string
  name: string
  slug: string
  blogs?: Blog[]
}

// Category Type
export interface Category {
  id: number
  documentId?: string
  name: string
  slug: string
  description: string
  icon?: Media
  blogs?: Blog[]
}

// Rich Text Node Type
export interface RichTextNode {
  type: string
  text?: string
  children?: RichTextNode[]
}

// Comment Type
export interface Comment {
  id: number
  documentId?: string
  name: string
  email: string
  approved: boolean
  message: string | RichTextNode[]
  createdAt: string
  updatedAt: string
  publishedAt?: string
  blog?: Blog
}

// Blog Type
export interface Blog {
  id: number
  documentId?: string
  title: string
  slug: string
  content: string
  coverImage?: Media
  excerpt?: string
  readingTime?: number
  featured?: boolean
  views: number
  upvotes: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  relatedTo?: Blog[]
  relatedBlogs?: Blog[]
  category?: Category
  tags?: Tag[]
  author?: User
  comments?: Comment[]
  seo?: SEO
}

// Frontend-friendly types (transformed from API data)
export interface BlogPost {
  id: number
  documentId?: string
  title: string
  slug: string
  content: string
  coverImage?: string
  excerpt?: string
  readingTime?: number
  featured: boolean
  views: number
  upvotes: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  category?: Category
  tags: Tag[]
  author?: User
  comments: Comment[]
  seo?: SEO
  relatedPosts?: BlogPost[]
}

export interface Author {
  id: number
  name: string
  avatar?: string
  bio?: string
}

// API Configuration
export interface ApiConfig {
  baseUrl: string
  readToken: string
  writeToken: string
}
