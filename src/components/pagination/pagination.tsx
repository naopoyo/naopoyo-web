'use client'

import { ScrollShadow } from '@heroui/scroll-shadow'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { useCreateQueryString } from '@/hooks'

export interface PaginationProps {
  totalItems: number
  pageSize: number
}

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
    <div className="flex flex-row items-center gap-2">
      <ScrollShadow ref={scrollContainerRef} orientation="horizontal" size={80}>
        <UIPagination className="justify-start">
          <PaginationContent>
            {pageItems.map((pageItem) => (
              <PaginationItem key={`paginator-${pageItem.num}`}>
                {isActive(pageItem.num) && <div ref={scrollAnchorRef} />}
                <PaginationLink
                  href={isActive(pageItem.num) ? '' : pageItem.href}
                  isActive={isActive(pageItem.num)}
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
    </div>
  )
}
