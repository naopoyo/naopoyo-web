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

  return <div className="text-sm text-nowrap text-muted-foreground">全 {totalCount} 件</div>
}
