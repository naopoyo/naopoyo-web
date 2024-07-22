import { Metadata } from 'next'
import { Suspense } from 'react'

import { DocumentList, DocumentListSkeleton } from '@/components/document'
import { Link } from '@/components/link'
import { PageHeader } from '@/components/page-header'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/hackersheet'

const title = 'Docs'

export const metadata: Metadata = {
  title: title,
  description: 'naopoyo.comのすべての記事の一覧ページです。',
}

export interface DocsPageProps {
  searchParams: { keyword?: string }
}

export const revalidate = 60

export default async function DocsPage({ searchParams }: DocsPageProps) {
  const keyword = searchParams.keyword
  const { documents, totalCount } = await getDocuments({ keyword })
  const isNotFound = keyword && totalCount === 0

  return (
    <main className="container">
      <PageHeader>{title}</PageHeader>
      <section className="mx-auto mb-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="text-muted-foreground">全 {totalCount} 件</div>
        <div className="w-[348px]">
          <SearchForm keyword={keyword} />
        </div>
        <div className="text-center">
          <Link href="/tags" icon="arrow">
            タグで探す
          </Link>
        </div>
      </section>
      <Suspense fallback={<DocumentListSkeleton length={9} />}>
        <section>
          {isNotFound ? <DocumentListNotFound /> : <DocumentList documents={documents} />}
        </section>
      </Suspense>
    </main>
  )
}

async function getDocuments({ keyword }: { keyword?: string }) {
  return await client.getDocuments({
    filter: { draft: false, keyword: keyword },
    sort: { by: 'published_at', order: 'desc' },
  })
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
