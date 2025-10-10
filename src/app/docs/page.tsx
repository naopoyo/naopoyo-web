import { Metadata } from 'next'
import { Suspense } from 'react'

import { getDocuments } from '@/actions'
import { DocumentList, DocumentListSkeleton } from '@/components/document'
import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'
import { Input } from '@/components/ui/input'

import SortBySelect from './_components/sort-by-select'

const title = 'Docs'
const description = 'naopoyo.comのすべての記事の一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export interface DocsPageProps {
  searchParams: Promise<{ keyword?: string; by?: string }>
}

export const revalidate = 60

export default async function DocsPage(props: DocsPageProps) {
  const searchParams = await props.searchParams
  const keyword = searchParams.keyword
  const sortOptions = new Map([['modified_at', 'modified_at']])
  const sortBy = sortOptions.get(searchParams.by ?? '') || 'published_at'
  const { documents, totalCount } = await getDocuments({ keyword, sortBy })
  const isNotFound = keyword && totalCount === 0

  return (
    <Container>
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader title={title} description={description} />
      </div>
      <section
        className={`
          mx-auto mb-10 flex flex-col items-center justify-center gap-4
          md:flex-row
        `}
      >
        <div className="text-muted-foreground">全 {totalCount} 件</div>
        <div>
          <SortBySelect sortBy={sortBy} />
        </div>
        <div className="w-[348px]">
          <SearchForm keyword={keyword} sortBy={searchParams.by} />
        </div>
      </section>
      <Suspense fallback={<DocumentListSkeleton length={9} />}>
        <section>
          {isNotFound ? <DocumentListNotFound /> : <DocumentList documents={documents} />}
        </section>
      </Suspense>
    </Container>
  )
}

function DocumentListNotFound() {
  return <div className="text-center">検索結果がありませんでした。</div>
}

function SearchForm({ keyword, sortBy }: { keyword?: string; sortBy?: string }) {
  return (
    <form action="/docs" method="get">
      {sortBy && <Input type="hidden" name="by" defaultValue={sortBy} />}
      <Input
        className="text-base"
        type="search"
        name="keyword"
        defaultValue={keyword}
        placeholder="キーワードを入力して検索"
      />
    </form>
  )
}
