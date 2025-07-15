import { BlogFeed } from "@/components/blog-feed"
import { SearchBar } from "@/components/search-bar"
import { FilterTabs } from "@/components/filter-tabs"
import { Sidebar } from "@/components/sidebar"

export default function HomePage({
  searchParams,
}: {
  searchParams: { filter?: string; search?: string; tag?: string }
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <SearchBar defaultValue={searchParams.search} />
          <FilterTabs currentFilter={searchParams.filter} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogFeed filter={searchParams.filter} search={searchParams.search} tag={searchParams.tag} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
