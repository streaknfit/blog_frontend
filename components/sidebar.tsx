"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationLink } from "@/components/navigation-link"
import { tagApi, categoryApi } from "@/lib/api"
import { mockTags, mockAuthors } from "@/lib/mock-data"
import type { Tag, Category } from "@/lib/types"

interface SidebarProps {
  tags: Tag[]
  categories: Category[]
}

export function Sidebar({ tags, categories }: SidebarProps) {
  return (
    <div className="space-y-6">
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <NavigationLink
                  key={category.id}
                  href={`/?category=${category.slug}`}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  {category.icon?.url ? (
                    <img
                      src={category.icon.url}
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
                </NavigationLink>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
