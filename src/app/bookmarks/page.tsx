import { Metadata } from 'next'
import { Suspense } from 'react'

import { BookmarkFilter, BookmarkList, BookmarkListSkeleton } from '@/components/bookmark'
import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'
import { makeWebsiteQuery } from '@/lib/hackersheet'

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
    <Container>
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader title={title} description={description} />

        <div className="w-[348px]">
          <BookmarkFilter keyword={keyword} />
        </div>
      </div>

      <section className="mx-auto flex max-w-(--breakpoint-md) flex-col gap-4">
        <Suspense key={suspenseKey} fallback={<BookmarkListSkeleton />}>
          <BookmarkList first={first} after={after} keyword={keyword} />
        </Suspense>
      </section>
    </Container>
  )
}
