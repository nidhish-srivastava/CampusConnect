import { cn } from "@/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(" bg-gray-300 animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
