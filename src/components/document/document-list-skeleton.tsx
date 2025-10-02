import { Skeleton } from '@/components/ui/skeleton'

export interface DocumentListSkeletonProps {
  length: number
}

export default function DocumentListSkeleton({ length }: DocumentListSkeletonProps) {
  return (
    <div className={`
      grid grid-cols-1 gap-8
      md:grid-cols-3
    `}>
      {Array.from({ length: length }).map((_, index) => (
        <Skeleton key={`skeleton-item-${index}`} className="h-[300px]" />
      ))}
    </div>
  )
}
