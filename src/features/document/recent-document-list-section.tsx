import { RecentDocumentList } from '@/features/document'

/**
 * RecentDocumentListSection コンポーネントの Props
 */
export interface RecentDocumentListSectionProps {
  /** 現在のドキュメントのスラッグ（除外用） */
  documentSlug: string
}

/**
 * RecentDocumentListSection コンポーネント - 最近更新された記事セクションを表示します
 *
 * Suspense 境界内で使用するためのラッパーコンポーネントです。
 * 現在表示中のドキュメントを除外して、最近更新された記事を表示します。
 *
 * @param props - RecentDocumentListSectionProps
 * @returns 最近更新された記事セクションを表示する JSX 要素
 */
export default async function RecentDocumentListSection({
  documentSlug,
}: RecentDocumentListSectionProps) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-center text-xl font-bold">最近更新された記事</h2>
      <RecentDocumentList first={3} excludeSlugs={[documentSlug]} />
    </div>
  )
}
