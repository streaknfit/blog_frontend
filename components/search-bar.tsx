"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  defaultValue?: string
}

export function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const [search, setSearch] = useState(defaultValue)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (value: string) => {
    setIsSearching(true)
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }

    router.push(`/?${params.toString()}`)
  }

  // Reset searching state when search params change
  useEffect(() => {
    setIsSearching(false)
  }, [searchParams])

  const clearSearch = () => {
    setSearch("")
    handleSearch("")
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        {isSearching ? (
          <Loader2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          type="text"
          placeholder="Search articles, authors, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(search)
            }
          }}
          className="pl-10 pr-10 h-12 text-base"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
