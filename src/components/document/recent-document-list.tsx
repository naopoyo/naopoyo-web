import { getPicupSlugs } from '@/actions'
import { MutedMessage } from '@/components/message'
import { RECENT_DOCS_COUNT } from '@/constants'
import { client } from '@/lib/hackersheet'

import DocumentList from './document-list'

export default async function RecentDocumentList() {
  const picupSlugs = await getPicupSlugs()
  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, excludeSlugs: picupSlugs },
    sort: { by: 'updated_at', order: 'desc' },
    first: RECENT_DOCS_COUNT,
  })

  if (totalCount === 0) return <MutedMessage>最近更新された記事はありません。</MutedMessage>

  return <DocumentList documents={documents} />
}
