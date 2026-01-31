import { Metadata } from 'next'
import { Suspense } from 'react'

import { Container } from '@/components/layouts/containers'
import { PageHeader } from '@/components/layouts/page-headers'
import {
  BookmarkFilter,
  BookmarkItems,
  BookmarkItemsSkeleton,
  BookmarkPagination,
  BookmarkPaginationSkeleton,
} from '@/features/bookmark'
import { makeWebsiteQuery } from '@/lib/hackersheet'
import { bookmarkSearchParamsCache } from '@/nuqs/bookmark'

const title = 'Bookmarks'
const description = 'naopoyo.comの記事からリンクされているウェブサイトの一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

/**
 * BookmarksPage の Props
 */
export interface BookmarksPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const revalidate = 60

/**
 * ブックマーク一覧ページ
 *
 * ウェブサイトのブックマーク一覧を表示します。
 * ページネーションと検索機能をサポートしています。
 */
export default async function BookmarksPage(props: BookmarksPageProps) {
  const { page, keyword } = await bookmarkSearchParamsCache.parse(props.searchParams)
  const { first, after, itemsSuspenseKey, paginationSuspenseKey } = makeWebsiteQuery({
    page,
    keyword,
  })

  return (
    <Container className="flex flex-col items-center gap-8 pt-16">
      <PageHeader title={title} description={description} />

      <div className="w-87">
        <BookmarkFilter keyword={keyword} />
      </div>

      <section className={`mx-auto flex w-full max-w-(--breakpoint-md) flex-col gap-4`}>
        <Suspense key={`${paginationSuspenseKey}-top`} fallback={<BookmarkPaginationSkeleton />}>
          <BookmarkPagination first={first} keyword={keyword} />
        </Suspense>

        <Suspense key={itemsSuspenseKey} fallback={<BookmarkItemsSkeleton />}>
          <BookmarkItems first={first} after={after} keyword={keyword} />
        </Suspense>

        <Suspense key={`${paginationSuspenseKey}-bottom`} fallback={<BookmarkPaginationSkeleton />}>
          <BookmarkPagination first={first} keyword={keyword} />
        </Suspense>
      </section>
    </Container>
  )
}
