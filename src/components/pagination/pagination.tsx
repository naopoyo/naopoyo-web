'use client'

import { useSearchParams } from 'next/navigation'

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

  return (
    <div className="flex flex-row items-center">
      <div className="flex-auto overflow-auto">
        <UIPagination className="justify-start">
          <PaginationContent>
            {pageItems.map((pageItem) => (
              <PaginationItem key={`paginator-${pageItem.num}`}>
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
      </div>
      <div className="text-nowrap text-sm text-muted-foreground">
        {totalItems} 件中 {start} - {end}
      </div>
    </div>
  )
}
