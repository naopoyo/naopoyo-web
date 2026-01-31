import { MutedMessage } from '@/components/feedback/message'
import { client } from '@/lib/hackersheet'

import DocumentList from './document-list'


/**
 * PickupDocumentList コンポーネント - ピックアップされたドキュメントを表示します
 *
 * 'pickup' スラッグのドキュメントツリーから、ピックアップされたドキュメント一覧を
 * サーバーサイドで取得して表示します。
 * ピックアップドキュメントがない場合は、メッセージを表示します。
 *
 * @returns ピックアップドキュメント一覧またはメッセージを表示する JSX 要素
 */
export default async function PickupDocumentList() {
  const { tree } = await client.getTree({ slug: 'pickup' })
  const picupSlugs = (tree?.flatNodes
    .map((node) => node.document?.slug)
    .filter((s) => s !== undefined) ?? []) as string[]

  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, slugs: picupSlugs },
    sort: { by: 'published_at', order: 'desc' },
    first: picupSlugs.length,
  })

  if (totalCount === 0) return <MutedMessage>おすすめの記事はありません。</MutedMessage>

  return <DocumentList documents={documents} />
}
