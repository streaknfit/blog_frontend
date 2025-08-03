import { serverBlogApi, serverTagApi, serverCategoryApi } from "@/lib/api-server"
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

  // Fetch all data server-side
  const blogsResult = await serverBlogApi.getAll({
    filters: params.tag ? { tags: { slug: { $eq: params.tag } } } :
            params.category ? { category: { slug: { $eq: params.category } } } : {},
    sort: params.filter === "trending" ? "upvotes:desc,views:desc"
         : params.filter === "hot" ? "upvotes:desc"
         : params.filter === "latest" ? "createdAt:desc"
         : "createdAt:desc",
    populate: "*",
    pageSize: 12,
  });
  const blogs = blogsResult.blogs;
  const tags = await serverTagApi.getAll();
  const categories = await serverCategoryApi.getAll();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <SearchBar defaultValue={params.search} />
          <FilterTabs currentFilter={params.filter} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogFeed blogs={blogs} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar tags={tags} categories={categories} />
          </div>
        </div>
      </main>
    </div>
  )
}
