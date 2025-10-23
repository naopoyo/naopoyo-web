import { getDocuments } from '@/actions'
import { MutedMessage } from '@/components/message'

import DocumentList from './document-list'

export type AllDocumentListProps = {
  keyword?: string
  sortBy?: string
}

export default async function AllDocumentList(props: AllDocumentListProps) {
  const { keyword, sortBy = 'published_at' } = props
  const { documents, totalCount } = await getDocuments({ keyword, sortBy })

  if (totalCount === 0) return <MutedMessage>検索結果がありませんでした。</MutedMessage>

  return <DocumentList documents={documents} />
}
