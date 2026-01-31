import { DocumentList } from '@/features/document'
import { client } from '@/lib/hackersheet'

/**
 * InboundLinkDocumentList コンポーネントの Props
 */
export interface InboundLinkDocumentListProps {
  /** ドキュメントのスラッグ */
  documentSlug: string
}

/**
 * InboundLinkDocumentList コンポーネント - リンク元記事の一覧を表示します
 *
 * async Server Component として実装されており、Suspense でラップすることで
 * ストリーミング表示が可能です。リンク元記事がない場合は何も表示しません。
 *
 * @param props - InboundLinkDocumentListProps
 * @returns リンク元記事の一覧を表示する JSX 要素、またはリンク元がない場合は null
 */
export default async function InboundLinkDocumentList({
  documentSlug,
}: InboundLinkDocumentListProps) {
  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document || document.inboundLinkDocuments.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-center text-xl font-bold">この記事にリンクしている記事</h2>
      <DocumentList documents={document.inboundLinkDocuments} />
    </div>
  )
}
