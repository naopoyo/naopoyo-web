import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DocumentList, DocumentToc } from '@/components/document'
import DropdownToc from '@/components/document/dropdown-toc'
import { DocumentContent } from '@/components/document-content'
import { client } from '@/lib/hackersheet'

import { DocumentHeader } from './_components'

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
    <div className="flex flex-col gap-24 pt-10">
      <div className="mx-auto flex max-w-full flex-row gap-14">
        <div className="flex w-full flex-col gap-14 px-4 md:w-[768px]">
          <DocumentHeader document={document} />
          <main>
            <DocumentContent document={document} permaLinkFormat="/docs/{{slug}}" />
          </main>
        </div>
        <aside className="hidden w-[300px] md:inline-block">
          <h2 className="font-bold text-muted-foreground">目次</h2>
          <div className="sticky top-[64px] p-2">
            <div className="relative max-h-[calc(100vh-var(--navbar-height)-8px)] overflow-auto">
              <DocumentToc />
            </div>
          </div>
        </aside>
      </div>
      {showInboundLinkDocuments && (
        <section className="container flex flex-col gap-5">
          <h2 className="text-center text-xl font-bold">この記事にリンクしている記事</h2>
          <DocumentList documents={document.inboundLinkDocuments} />
        </section>
      )}
      {showRecentDocuments && (
        <section className="container flex flex-col gap-5">
          <h2 className="text-center text-xl font-bold">最近公開された記事</h2>
          <DocumentList documents={resentDocuments} />
        </section>
      )}
      <div className="fixed bottom-4 right-4 md:hidden">
        <DropdownToc />
      </div>
    </div>
  )
}
