import { getPicupSlugs } from '@/actions'
import { MutedMessage } from '@/components/message'
import { RECENT_DOCS_COUNT } from '@/constants'
import { client } from '@/lib/hackersheet'

import DocumentList from './document-list'

export type RecentDocumentListProps = {
  first?: number
  excludeSlugs?: string[]
}

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
