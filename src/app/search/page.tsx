import { Metadata } from 'next'

import { DocumentList } from '@/components/document'
import { Input } from '@/components/ui/input'
import { getDocuments } from '@/lib/hackersheet'

export const metadata: Metadata = {
  title: 'Search',
}

export interface SearchPageProps {
  searchParams: { keyword?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams.keyword

  if (!keyword) {
    return (
      <>
        <h1 className="py-16 text-center text-4xl font-bold">Search</h1>
        <section className="px-8">
          <SearchForm />
        </section>
        <section className="p-8 text-center">
          <p>キーワードを入力してください。</p>
        </section>
      </>
    )
  }

  const { documents } = await getDocuments({
    filter: { draft: false, keyword: keyword },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <>
      <h1 className="py-16 text-center text-4xl font-bold">Search</h1>
      <section className="px-8">
        <SearchForm keyword={keyword} />
      </section>
      <section className="p-8">
        <DocumentList documents={documents} />
        {documents.length === 0 && <p className="text-center">検索結果がありませんでした。</p>}
      </section>
    </>
  )
}

function SearchForm({ keyword }: { keyword?: string }) {
  return (
    <div className="text-center">
      <form action="/search" method="get">
        <Input
          className="text-base"
          type="search"
          name="keyword"
          defaultValue={keyword}
          placeholder="キーワードを入力"
        />
      </form>
    </div>
  )
}
