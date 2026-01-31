import { Metadata } from 'next'
import { Suspense } from 'react'

import { Container } from '@/components/layouts/containers'
import { PageHeader } from '@/components/layouts/page-headers'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AllDocumentList,
  DocumentFilter,
  DocumentTotalCount,
  DocumentListSkeleton,
} from '@/features/document'
import { documentSearchParamsCache } from '@/nuqs/document'

const title = 'Docs'
const description = 'naopoyo.comのすべての記事の一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

/**
 * DocsPage の Props
 */
export interface DocsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const revalidate = 60

/**
 * ドキュメント一覧ページ
 *
 * すべての記事を表示します。
 * キーワード検索とソート機能をサポートしています。
 */
export default async function DocsPage(props: DocsPageProps) {
  const { keyword, by } = await documentSearchParamsCache.parse(props.searchParams)
  const sortOptions = new Map([['published_at', 'published_at']])
  const sortBy = sortOptions.get(by) || 'modified_at'

  return (
    <Container className="flex flex-col gap-8 pt-16">
      <PageHeader title={title} description={description} />
      <div
        className={`
          flex flex-col items-center justify-center gap-4
          sm:flex-row
        `}
      >
        <Suspense fallback={<Skeleton className="h-7 w-20 rounded-full" />}>
          <DocumentTotalCount keyword={keyword} sortBy={sortBy} />
        </Suspense>
        <DocumentFilter />
      </div>
      <Suspense fallback={<DocumentListSkeleton length={9} />}>
        <AllDocumentList keyword={keyword} sortBy={sortBy} />
      </Suspense>
    </Container>
  )
}
