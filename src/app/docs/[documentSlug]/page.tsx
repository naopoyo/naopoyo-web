import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DocumentList } from '@/components/document'
import { Container } from '@/components/layout'
import { client, DocumentContent } from '@/lib/hackersheet'

import { DocumentHeader, DocumentToc, DocumentDropdownToc } from './_components'

interface DocumentPageProps {
  params: Promise<{ documentSlug: string }>
}

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata(props: DocumentPageProps): Promise<Metadata> {
  const params = await props.params

  const { documentSlug } = params

  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document) notFound()

  return {
    title: document.title,
  }
}

export default async function DocumentPage(props: DocumentPageProps) {
  const params = await props.params

  const { documentSlug } = params

  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document || document.draft) {
    return notFound()
  }

  const { documents: resentDocuments } = await client.getDocuments({
    first: 3,
    filter: { draft: false, excludeSlugs: [document.slug] },
    sort: { by: 'published_at', order: 'desc' },
  })

  const showInboundLinkDocuments = document.inboundLinkDocuments.length > 0
  const showRecentDocuments = resentDocuments.length > 0

  return (
    <Container className="flex flex-col gap-24 px-4 pt-10">
      <div className="mx-auto flex max-w-full gap-14">
        <div
          className={`
            flex w-full flex-col gap-14
            md:w-[768px]
          `}
        >
          <DocumentHeader document={document} />
          <main>
            <DocumentContent document={document} />
          </main>
        </div>
        <aside
          className={`
            hidden w-[300px]
            md:inline-block
          `}
        >
          <h2 className="mb-2 font-bold text-muted-foreground">目次</h2>
          <div className="sticky top-[64px]">
            <DocumentToc />
          </div>
        </aside>
      </div>
      {showInboundLinkDocuments && (
        <div className="flex flex-col gap-5">
          <h2 className="text-center text-xl font-bold">この記事にリンクしている記事</h2>
          <DocumentList documents={document.inboundLinkDocuments} />
        </div>
      )}
      {showRecentDocuments && (
        <div className="flex flex-col gap-5">
          <h2 className="text-center text-xl font-bold">最近公開された記事</h2>
          <DocumentList documents={resentDocuments} />
        </div>
      )}
      <div
        className={`
          fixed right-4 bottom-4
          md:hidden
        `}
      >
        <DocumentDropdownToc />
      </div>
    </Container>
  )
}
