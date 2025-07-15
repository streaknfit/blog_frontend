import { Skeleton } from "@/components/ui/skeleton"

export function BlogCardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-48 md:flex-shrink-0">
          <Skeleton className="w-full h-48 md:h-32 rounded-lg" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-12" />
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-14 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
