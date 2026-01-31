import { Skeleton } from '@/components/ui/skeleton'

/**
 * DocumentListSkeleton コンポーネントの Props
 */
export type DocumentListSkeletonProps = {
  /** レンダリングするスケルトン数 */
  length: number
}

/**
 * グリッドコンテナの CSS クラス
 * @internal
 */
const GRID_CONTAINER_CLASS = `
  grid grid-cols-1 gap-6
  sm:grid-cols-2
  lg:grid-cols-3
`

/**
 * スケルトンカードの CSS クラス
 * @internal
 */
const SKELETON_CARD_CLASS = `
  row-span-3 grid grid-rows-subgrid gap-y-4 overflow-hidden rounded-xl border bg-card p-6
`

/**
 * DocumentListSkeleton コンポーネント - ドキュメント一覧用のプレースホルダ（スケルトン）を表示します
 *
 * ドキュメント一覧が読み込み中の間、スケルトンローディングを表示します。
 * DocumentList と同じグリッドレイアウトを使用して、レイアウトシフトを防ぎます。
 * レスポンシブデザイン対応で、モバイルでは1列、タブレットでは2列、デスクトップでは3列表示です。
 *
 * @param props - DocumentListSkeletonProps
 * @returns スケルトンカードのグリッド要素
 */
export default function DocumentListSkeleton({ length }: DocumentListSkeletonProps) {
  return (
    <div className={GRID_CONTAINER_CLASS}>
      {Array.from({ length }).map((_, index) => (
        <div key={`skeleton-item-${index}`} className={SKELETON_CARD_CLASS}>
          {/* プレビュー画像エリア */}
          <Skeleton className="-mx-6 -mt-6 h-32" />

          {/* タイトルエリア */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>

          {/* メタデータエリア */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-12 rounded-md" />
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
