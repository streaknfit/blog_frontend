"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tagApi, categoryApi } from "@/lib/api"
import { mockTags, mockAuthors } from "@/lib/mock-data"
import type { Tag, Category } from "@/lib/types"

export function Sidebar() {
  const [tags, setTags] = useState<Tag[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true)
        setUsingFallback(false)
        
        const [tagsData, categoriesData] = await Promise.all([
          tagApi.getAll(),
          categoryApi.getAll()
        ])
        
        setTags(tagsData.slice(0, 8)) // Show top 8 tags
        setCategories(categoriesData.slice(0, 5)) // Show top 5 categories
      } catch (error) {
        console.error('Error fetching sidebar data:', error)
        
        // Fall back to mock data
        if (!usingFallback) {
          console.log('Falling back to mock sidebar data...')
          setUsingFallback(true)
          setTags(mockTags.slice(0, 8))
          setCategories([]) // No mock categories, so we'll show empty
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSidebarData()
  }, [usingFallback])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 w-16 bg-muted rounded-full animate-pulse" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-32 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {usingFallback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 text-xs">
            ⚠️ Demo mode: Showing sample tags
          </p>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
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

      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/?category=${category.slug}`}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  {category.icon?.data?.attributes?.url ? (
                    <img
                      src={`https://backend.blog.streaknfit.com${category.icon.data.attributes.url}`}
                      alt={category.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{category.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{category.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
