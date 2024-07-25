import { Metadata } from 'next'
import { Suspense } from 'react'

import { PageHeader } from '@/components/page-header'
import { makeWebsiteQuery } from '@/lib/hackersheet'

import { BookmarkList, BookmarkListSkeleton } from './_components'

const title = 'Bookmarks'
const description = 'naopoyo.comの記事からリンクされているウェブサイトの一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
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
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader>{title}</PageHeader>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <section className="mx-auto flex max-w-screen-md flex-col gap-4">
        <Suspense key={suspenseKey} fallback={<BookmarkListSkeleton />}>
          <BookmarkList first={first} after={after} />
        </Suspense>
      </section>
    </div>
  )
}
