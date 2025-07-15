"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

const filters = [
  { key: "", label: "Latest" },
  { key: "trending", label: "Trending" },
  { key: "hot", label: "Hot" },
  { key: "featured", label: "Featured" },
]

interface FilterTabsProps {
  currentFilter?: string
}

export function FilterTabs({ currentFilter = "" }: FilterTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (filterKey: string) => {
    const params = new URLSearchParams(searchParams)

    if (filterKey) {
      params.set("filter", filterKey)
    } else {
      params.delete("filter")
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          variant={currentFilter === filter.key ? "default" : "outline"}
          onClick={() => handleFilterChange(filter.key)}
          className="rounded-full"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
