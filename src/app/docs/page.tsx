import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

import { DocumentList } from '@/components/document'
import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'
import { DocumentListSkeleton } from '@/components/skeleton'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/hackersheet'

const title = 'Docs'

export const metadata: Metadata = {
  title: title,
}

export interface DocsPageProps {
  searchParams: { keyword?: string }
}

export default async function DocsPage({ searchParams }: DocsPageProps) {
  const keyword = searchParams.keyword

  return (
    <main className="container">
      <PageHeader>{title}</PageHeader>
      <section className="mx-auto mb-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="w-[348px]">
          <SearchForm keyword={keyword} />
        </div>
        <Link href="/tags" className="flex items-center gap-1">
          <span>タグで探す</span>
          <ArrowRight />
        </Link>
      </section>
      <Suspense fallback={<DocumentListSkeleton length={9} />}>
        <DocumentListSection keyword={keyword} />
      </Suspense>
    </main>
  )
}

async function DocumentListSection({ keyword }: { keyword?: string }) {
  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, keyword: keyword },
    sort: { by: 'published_at', order: 'desc' },
  })

  const isNotFound = keyword && totalCount === 0

  return (
    <section>
      {isNotFound ? <DocumentListNotFound /> : <DocumentList documents={documents} />}
    </section>
  )
}

function DocumentListNotFound() {
  return <div className="text-center">検索結果がありませんでした。</div>
}

function SearchForm({ keyword }: { keyword?: string }) {
  return (
    <form action="/docs" method="get">
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
