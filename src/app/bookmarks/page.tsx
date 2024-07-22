import { Metadata } from 'next'
import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'
import { makeWebsiteQuery } from '@/lib/hackersheet'

import { BookmarkList, BookmarkListSkeleton } from './_components'

const title = 'Bookmarks'

export const metadata: Metadata = {
  title: title,
  description: 'naopoyo.comの記事からリンクされているウェブサイトの一覧ページです。',
}

export interface BookmarksPageProps {
  searchParams: {
    page?: number
  }
}

export const revalidate = 60

export default async function BookmarksPage({ searchParams }: BookmarksPageProps) {
  const { first, after, suspenseKey } = makeWebsiteQuery({ page: searchParams.page })

  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>

      <section className="mx-auto flex max-w-screen-md flex-col gap-4">
        <Suspense key={suspenseKey} fallback={<BookmarkListSkeleton />}>
          <BookmarkList first={first} after={after} />
        </Suspense>
      </section>
    </div>
  )
}
