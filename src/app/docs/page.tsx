'use cache'

import { Metadata } from 'next'
import { Suspense } from 'react'

import {
  AllDocumentList,
  DocumentFilter,
  DocumentTotalCount,
  DocumentListSkeleton,
} from '@/components/document'
import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'
import { Skeleton } from '@/components/ui/skeleton'

const title = 'Docs'
const description = 'naopoyo.comのすべての記事の一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export interface DocsPageProps {
  searchParams: Promise<{ keyword?: string; by?: string }>
}

// export const revalidate = 60

export default async function DocsPage(props: DocsPageProps) {
  const searchParams = await props.searchParams
  const keyword = searchParams.keyword
  const sortOptions = new Map([['modified_at', 'modified_at']])
  const sortBy = sortOptions.get(searchParams.by ?? '') || 'published_at'

  return (
    <Container className="flex flex-col gap-8 pt-16">
      <PageHeader title={title} description={description} />
      <div
        className={`
          flex flex-col items-center justify-center gap-4
          md:flex-row
        `}
      >
        <Suspense fallback={<Skeleton className="size-8" />}>
          <DocumentTotalCount keyword={keyword} sortBy={sortBy} />
        </Suspense>
        <DocumentFilter keyword={keyword} sortBy={sortBy} />
      </div>
      <Suspense fallback={<DocumentListSkeleton length={9} />}>
        <AllDocumentList keyword={keyword} sortBy={sortBy} />
      </Suspense>
    </Container>
  )
}
