import { getDocuments } from '@/actions'
import { MutedMessage } from '@/components/feedback/message'

import DocumentList from './document-list'

/**
 * AllDocumentList コンポーネントの Props
 *
 * @property {string} [keyword] - 検索キーワード
 * @property {string} [sortBy] - ドキュメントのソート順（デフォルト: 'published_at'）
 */
export type AllDocumentListProps = {
  /** 検索キーワード */
  keyword?: string
  /** ドキュメントのソート順（'published_at' または 'modified_at'） */
  sortBy?: string
}

/**
 * AllDocumentList コンポーネント - フィルタリング条件に基づくドキュメント一覧を表示します
 *
 * 検索キーワードとソート順に基づいて、マッチするドキュメント一覧を
 * サーバーサイドで取得して表示します。
 * 検索結果がない場合は、メッセージを表示します。
 *
 * @param props - AllDocumentListProps
 * @returns ドキュメント一覧またはメッセージを表示する JSX 要素
 */
export default async function AllDocumentList(props: AllDocumentListProps) {
  const { keyword, sortBy = 'published_at' } = props
  const { documents, totalCount } = await getDocuments({ keyword, sortBy })

  if (totalCount === 0) return <MutedMessage>検索結果がありませんでした。</MutedMessage>

  return <DocumentList documents={documents} />
}
