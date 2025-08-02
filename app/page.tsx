import { BlogFeed } from "@/components/blog-feed"
import { SearchBar } from "@/components/search-bar"
import { FilterTabs } from "@/components/filter-tabs"
import { Sidebar } from "@/components/sidebar"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; search?: string; tag?: string; category?: string }>
}) {
  const params = await searchParams
  
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <SearchBar defaultValue={params.search} />
          <FilterTabs currentFilter={params.filter} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogFeed 
              filter={params.filter} 
              search={params.search} 
              tag={params.tag}
              category={params.category}
            />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
