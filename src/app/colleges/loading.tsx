import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="flex min-h-full gap-5 items-center justify-center">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[400px]" />
        <Skeleton className="h-8 w-[400px]" />
      </div>
    </div>
    )
  }