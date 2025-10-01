import { Metadata } from 'next'
import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'
import { Input } from '@/components/ui/input'
import { makeWebsiteQuery } from '@/lib/hackersheet'

import { BookmarkList, BookmarkListSkeleton } from './_components'

const title = 'Bookmarks'
const description = 'naopoyo.comの記事からリンクされているウェブサイトの一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export interface BookmarksPageProps {
  searchParams: Promise<{
    page?: number
    keyword?: string
  }>
}

export const revalidate = 60

export default async function BookmarksPage(props: BookmarksPageProps) {
  const searchParams = await props.searchParams
  const { first, after, keyword, suspenseKey } = makeWebsiteQuery({
    page: searchParams.page,
    keyword: searchParams.keyword,
  })

  return (
    <div className="container">
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader>{title}</PageHeader>

        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="w-[348px]">
          <SearchForm keyword={keyword} />
        </div>
      </div>

      <section className="mx-auto flex max-w-(--breakpoint-md) flex-col gap-4">
        <Suspense key={suspenseKey} fallback={<BookmarkListSkeleton />}>
          <BookmarkList first={first} after={after} keyword={keyword} />
        </Suspense>
      </section>
    </div>
  )
}

function SearchForm({ keyword }: { keyword?: string }) {
  return (
    <form action="/bookmarks" method="get">
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
