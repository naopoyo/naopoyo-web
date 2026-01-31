import { getPicupSlugs } from '@/actions'
import { MutedMessage } from '@/components/feedback/message'
import { RECENT_DOCS_COUNT } from '@/constants'
import { client } from '@/lib/hackersheet'

import DocumentList from './document-list'


/**
 * RecentDocumentList コンポーネントの Props
 *
 * @property {number} [first] - 取得するドキュメント数（デフォルト: RECENT_DOCS_COUNT）
 * @property {string[]} [excludeSlugs] - 除外するドキュメントのスラッグ配列（デフォルト: ピックアップドキュメント）
 */
export type RecentDocumentListProps = {
  /** 取得するドキュメント数 */
  first?: number
  /** 除外するドキュメントのスラッグ配列 */
  excludeSlugs?: string[]
}

/**
 * RecentDocumentList コンポーネント - 最近更新されたドキュメント一覧を表示します
 *
 * 更新日時が新しい順にドキュメント一覧を表示します。
 * ピックアップドキュメントは デフォルトで除外されます。
 * 最近更新されたドキュメントがない場合は、メッセージを表示します。
 *
 * @param props - RecentDocumentListProps
 * @returns 最近更新されたドキュメント一覧またはメッセージを表示する JSX 要素
 */
export default async function RecentDocumentList(props: RecentDocumentListProps) {
  const excludeSlugs = props.excludeSlugs ?? (await getPicupSlugs())
  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, excludeSlugs: excludeSlugs },
    sort: { by: 'modified_at', order: 'desc' },
    first: props.first ?? RECENT_DOCS_COUNT,
  })

  if (totalCount === 0) return <MutedMessage>最近更新された記事はありません。</MutedMessage>

  return <DocumentList documents={documents} />
}
