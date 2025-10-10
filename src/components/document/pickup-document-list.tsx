import { MutedMessage } from '@/components/message'
import { client } from '@/lib/hackersheet'

import DocumentList from './document-list'

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
