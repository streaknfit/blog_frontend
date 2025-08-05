import { serverBlogApi, serverTagApi, serverCategoryApi } from "@/lib/api-server"
import { BlogFeed } from "@/components/blog-feed"
import { SearchBar } from "@/components/search-bar"
import { Sidebar } from "@/components/sidebar"
import { generateMetadata as generateSEOMetadata } from "@/components/seo"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: 'StreaknFit Blog - Fitness Tips & Workout Routines',
    description: 'Discover the latest fitness tips, workout routines, and health insights. Get expert advice on training, nutrition, and wellness to achieve your fitness goals.',
    type: 'website'
  })
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tag?: string; category?: string; featured?: string }>
}) {
  const params = await searchParams

  // Fetch all data server-side
  const blogsResult = await serverBlogApi.getAll({
    filters: params.tag ? { tags: { slug: { $eq: params.tag } } } :
            params.category ? { category: { slug: { $eq: params.category } } } :
            params.featured ? { featured: { $eq: true } } : {},
    sort: "createdAt:desc",
    populate: "*",
    pageSize: 12,
  });
  const blogs = blogsResult.blogs;
  const tags = await serverTagApi.getAll();
  const categories = await serverCategoryApi.getAll();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-6">
          <SearchBar defaultValue={params.search} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogFeed blogs={blogs} />
          </div>
          <div className="lg:col-span-1">
            <Sidebar tags={tags} categories={categories} />
          </div>
        </div>
      </div>
    </div>
  )
}
