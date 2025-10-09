import { Skeleton } from '@/components/ui/skeleton'

/**
 * DocumentListSkeleton の Props
 *
 * length - レンダリングするスケルトンの数
 */
export type DocumentListSkeletonProps = {
  /** レンダリングするスケルトン数 */
  length: number
}

/**
 * DocumentListSkeleton コンポーネント - ドキュメント一覧用のプレースホルダ（スケルトン）を表示します。
 *
 * @param props - DocumentListSkeletonProps
 * @returns スケルトングリッドを含む JSX 要素
 */
export default function DocumentListSkeleton({ length }: DocumentListSkeletonProps) {
  return (
    <div
      className={`
        grid grid-cols-1 gap-8
        md:grid-cols-3
      `}
    >
      {Array.from({ length: length }).map((_, index) => (
        <Skeleton key={`skeleton-item-${index}`} className="h-[300px]" />
      ))}
    </div>
  )
}
