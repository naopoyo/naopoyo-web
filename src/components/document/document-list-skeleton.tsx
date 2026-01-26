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
  grid grid-cols-1 gap-8
  md:grid-cols-3
`

/**
 * DocumentListSkeleton コンポーネント - ドキュメント一覧用のプレースホルダ（スケルトン）を表示します
 *
 * ドキュメント一覧が読み込み中の間、スケルトンローディングを表示します。
 * DocumentList と同じグリッドレイアウトを使用して、レイアウトシフトを防ぎます。
 * レスポンシブデザイン対応で、モバイルでは1列、デスクトップでは3列表示です。
 *
 * @param props - DocumentListSkeletonProps
 * @returns スケルトンカードのグリッド要素
 */
export default function DocumentListSkeleton({ length }: DocumentListSkeletonProps) {
  return (
    <div className={GRID_CONTAINER_CLASS}>
      {Array.from({ length: length }).map((_, index) => (
        <Skeleton key={`skeleton-item-${index}`} className="h-75" />
      ))}
    </div>
  )
}
