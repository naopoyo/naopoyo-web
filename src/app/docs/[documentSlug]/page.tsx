import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DocumentList } from '@/components/document'
import { FlexCol, FlexRow } from '@/components/layout'
import { client, DocumentContent } from '@/lib/hackersheet'

import { DocumentHeader, DocumentToc, DropdownToc } from './_components'

interface DocumentPageProps {
  params: { documentSlug: string }
}

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata({
  params: { documentSlug },
}: DocumentPageProps): Promise<Metadata> {
  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document) notFound()

  return {
    title: document.title,
  }
}

export default async function DocumentPage({ params: { documentSlug } }: DocumentPageProps) {
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
    <FlexCol className="container gap-24 pt-10">
      <FlexRow className="mx-auto max-w-full gap-14">
        <FlexCol className="w-full gap-14 md:w-[768px]">
          <DocumentHeader document={document} />
          <main>
            <DocumentContent document={document} />
          </main>
        </FlexCol>
        <aside className="hidden w-[300px] md:inline-block">
          <h2 className="font-bold text-muted-foreground">目次</h2>
          <div className="sticky top-[64px] p-2">
            <ScrollShadow
              size={100}
              className="max-h-[calc(100vh-var(--navbar-height)-8px)] overflow-auto"
            >
              <DocumentToc />
            </ScrollShadow>
          </div>
        </aside>
      </FlexRow>
      {showInboundLinkDocuments && (
        <FlexCol className="container gap-5">
          <h2 className="text-center text-xl font-bold">この記事にリンクしている記事</h2>
          <DocumentList documents={document.inboundLinkDocuments} />
        </FlexCol>
      )}
      {showRecentDocuments && (
        <FlexCol className="container gap-5">
          <h2 className="text-center text-xl font-bold">最近公開された記事</h2>
          <DocumentList documents={resentDocuments} />
        </FlexCol>
      )}
      <div className="fixed bottom-4 right-4 md:hidden">
        <DropdownToc />
      </div>
    </FlexCol>
  )
}
