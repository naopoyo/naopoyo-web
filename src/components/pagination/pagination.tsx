'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { ScrollShadow } from '@/components/scroll-shadow'
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { useCreateQueryString } from '@/hooks'

/**
 * ページネーション コンポーネントの Props
 *
 * - totalItems: 全アイテム数
 * - pageSize: 1ページあたりのアイテム数
 */
export type PaginationProps = {
  totalItems: number
  pageSize: number
}

/**
 * ページネーションコンポーネント
 *
 * ナビゲーションランドマークを持つ横方向のページネーションを表示します。
 * 現在表示しているアイテム範囲（例: 1 - 10 / 100）も併せて表示します。
 *
 * @param props - PaginationProps
 * @returns ページネーションの JSX
 */
export default function Pagination({ totalItems, pageSize }: PaginationProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollAnchorRef = useRef<HTMLDivElement>(null)
  const totalPages = Math.ceil(totalItems / pageSize)
  const createQueryString = useCreateQueryString({ withPathname: true })
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const tmpEnd = pageSize * page
  const end = totalItems === 0 ? 0 : tmpEnd > totalItems ? totalItems : tmpEnd

  const pageItems = Array.from({ length: totalPages }).map((_, index) => ({
    num: index + 1,
    href: createQueryString({ page: (index + 1).toString() }),
  }))

  const isActive = (value: number) => value === page

  useEffect(() => {
    if (!scrollContainerRef.current || !scrollAnchorRef.current) {
      return
    }

    const container = scrollContainerRef.current
    const anchor = scrollAnchorRef.current
    const containerCenter = container.offsetLeft + container.clientWidth / 2
    const anchorCenter = anchor.offsetLeft + anchor.clientWidth / 2
    if (containerCenter < anchor.offsetLeft) {
      container.scrollLeft = anchorCenter - containerCenter
    }
  }, [])

  return (
    <nav aria-label="Pagination" className="flex flex-row items-center gap-2">
      <ScrollShadow ref={scrollContainerRef} orientation="horizontal" className="min-w-0 flex-1">
        <UIPagination className="justify-start">
          <PaginationContent>
            {pageItems.map((pageItem) => (
              <PaginationItem key={`paginator-${pageItem.num}`}>
                {isActive(pageItem.num) && <div ref={scrollAnchorRef} />}
                <PaginationLink
                  href={pageItem.href}
                  isActive={isActive(pageItem.num)}
                  aria-current={isActive(pageItem.num) ? 'page' : undefined}
                >
                  {pageItem.num}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </UIPagination>
      </ScrollShadow>
      <div className="text-sm text-nowrap text-muted-foreground">
        {totalItems} 件中 {start} - {end}
      </div>
    </nav>
  )
}
