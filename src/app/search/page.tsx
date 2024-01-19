import { Metadata } from 'next'

import { DocumentList } from '@/components/document'
import { PageHeader } from '@/components/page-header'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/hackersheet'

const title = 'Search'

export const metadata: Metadata = {
  title: title,
}

export interface SearchPageProps {
  searchParams: { keyword?: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const keyword = searchParams.keyword

  if (!keyword) {
    return (
      <div className="container">
        <PageHeader>{title}</PageHeader>
        <section className="my-8">
          <SearchForm keyword={keyword} />
        </section>
        <section className="pb-8">
          <p className="text-center">キーワードを入力してください。</p>
        </section>
      </div>
    )
  }

  const { documents } = await client.getDocuments({
    filter: { draft: false, keyword: keyword },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>
      <section className="my-8">
        <SearchForm keyword={keyword} />
      </section>
      <section className="pb-8">
        <DocumentList documents={documents} />
        {documents.length === 0 && <p className="text-center">検索結果がありませんでした。</p>}
      </section>
    </div>
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
          placeholder="キーワードを入力して検索"
        />
      </form>
    </div>
  )
}
