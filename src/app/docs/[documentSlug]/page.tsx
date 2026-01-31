import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { Container } from '@/components/layouts/containers'
import {
  DocumentArticle,
  DocumentArticleSkeleton,
  DocumentDropdownToc,
  DocumentListSkeleton,
  DocumentToc,
  InboundLinkDocumentList,
  RecentDocumentListSection,
} from '@/features/document'
import { client } from '@/lib/hackersheet'

type DocumentPageProps = {
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

  return (
    <Container className="flex flex-col gap-24 px-4 pt-10">
      <div className="mx-auto flex max-w-full gap-14">
        {/* メインコンテンツ - Suspense でストリーミング */}
        <div className="
          flex w-full flex-col gap-14
          md:w-3xl
        ">
          <Suspense fallback={<DocumentArticleSkeleton />}>
            <DocumentArticle documentSlug={documentSlug} />
          </Suspense>
        </div>

        {/* サイドバー - 静的に表示 */}
        <aside className="
          hidden w-75
          md:inline-block
        ">
          <h2 className="mb-2 font-bold text-muted-foreground">目次</h2>
          <div className="sticky top-16">
            <DocumentToc />
          </div>
        </aside>
      </div>

      {/* 関連記事 - Suspense でストリーミング */}
      <Suspense fallback={<DocumentListSkeleton length={3} />}>
        <InboundLinkDocumentList documentSlug={documentSlug} />
      </Suspense>

      {/* 最近の記事 - Suspense でストリーミング */}
      <Suspense fallback={<DocumentListSkeleton length={3} />}>
        <RecentDocumentListSection documentSlug={documentSlug} />
      </Suspense>

      {/* モバイル用TOC */}
      <div className="
        fixed right-4 bottom-4
        md:hidden
      ">
        <DocumentDropdownToc />
      </div>
    </Container>
  )
}
