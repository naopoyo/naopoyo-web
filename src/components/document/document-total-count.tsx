import { FileText } from 'lucide-react'

import { getDocuments } from '@/actions'

/**
 * DocumentTotalCount コンポーネントの Props
 *
 * @property {string} [keyword] - フィルタリング用の検索キーワード
 * @property {string} [sortBy] - フィルタリング用のソート順
 */
export type DocumentTotalCountProps = {
  /** フィルタリング用の検索キーワード */
  keyword?: string
  /** フィルタリング用のソート順（'published_at' または 'modified_at'） */
  sortBy?: string
}

/**
 * DocumentTotalCount コンポーネント - ドキュメント総数を表示します
 *
 * 検索条件やソート順に基づいた、ドキュメントの総数をサーバーサイドで取得して表示します。
 * Server Component として実装されており、データフェッチングはサーバー側で行われます。
 *
 * @param props - DocumentTotalCountProps
 * @returns ドキュメント総数を表示するテキスト要素
 */
export default async function DocumentTotalCount({ keyword, sortBy }: DocumentTotalCountProps) {
  const { totalCount } = await getDocuments({ keyword, sortBy })

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-sm font-medium
        text-muted-foreground
      `}
    >
      <FileText className="size-3.5" aria-hidden="true" />
      <span className="tabular-nums">{totalCount}</span>
      <span>件</span>
    </div>
  )
}
