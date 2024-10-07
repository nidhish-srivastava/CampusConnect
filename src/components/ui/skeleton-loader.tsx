import React from 'react'
import { Skeleton } from './skeleton'

function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-5 mt-20 items-center justify-center">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex min-h-full gap-5 items-center justify-center">
           <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[400px]" />
        <Skeleton className="h-8 w-[400px]" />
      </div>
      </div>
    ))}
  </div>
  )
}

export default SkeletonLoader