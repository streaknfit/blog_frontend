import { Metadata } from 'next'
import type { BlogPost } from '@/lib/types'

interface SEOProps {
  blog?: BlogPost
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export function generateMetadata({
  blog,
  title,
  description,
  image,
  url,
  type = 'website'
}: SEOProps): Metadata {
  // Use blog data if available, otherwise use provided props
  const metaTitle = blog?.seo?.metaTitle || blog?.title || title || 'StreaknFit Blog'
  const metaDescription = blog?.seo?.metaDescription || blog?.excerpt || description || 'Discover fitness tips, workout routines, and health insights on StreaknFit Blog.'
  const metaImage = blog?.seo?.metaImageURL || blog?.coverImageURL || image || '/default-og-image.svg'
  const metaUrl = url || (blog ? `https://streaknfit.com/blog/${blog.slug}` : 'https://streaknfit.com')

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: 'StreaknFit Blog',
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: metaUrl,
    },
    keywords: blog?.tags?.map(tag => tag.name).join(', ') || 'fitness, workout, health, exercise, wellness',
    authors: blog?.author ? [{ name: blog.author.username }] : undefined,
    category: blog?.category?.name,
  }
}

export function generateStructuredData(blog?: BlogPost) {
  if (!blog) return null

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImageURL,
    author: blog.author ? {
      '@type': 'Person',
      name: blog.author.username,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'StreaknFit',
      logo: {
        '@type': 'ImageObject',
        url: 'https://streaknfit.com/logo.png',
      },
    },
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://streaknfit.com/blog/${blog.slug}`,
    },
    ...(blog.category && {
      articleSection: blog.category.name,
    }),
    ...(blog.tags && blog.tags.length > 0 && {
      keywords: blog.tags.map(tag => tag.name).join(', '),
    }),
  }

  return structuredData
} 