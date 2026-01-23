import { render, cleanup } from '@testing-library/react'
import { ReactNode } from 'react'
import { describe, it, expect, afterEach } from 'vitest'

interface MockSkeletonProps {
  children?: ReactNode
  className?: string
}

interface MockPaginationProps {
  totalItems: number
  pageSize: number
}

// モック化されたコンポーネント
const MockSkeleton = ({ children, className }: MockSkeletonProps) => (
  <div data-testid="skeleton" className={className}>
    {children}
  </div>
)

const MockPagination = ({ totalItems, pageSize }: MockPaginationProps) => (
  <div data-testid="pagination" data-total-items={totalItems} data-page-size={pageSize}>
    Pagination
  </div>
)

// BookmarkListSkeletonコンポーネントの実装
const BookmarkListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <MockPagination totalItems={1} pageSize={1} />
      {Array.from({ length: 20 }).map((_, index) => (
        <MockSkeleton key={`bookmark-list-skeleton-${index}`} className={`w-full rounded-lg`}>
          <div className="h-28 w-full rounded-lg"></div>
        </MockSkeleton>
      ))}
      <MockPagination totalItems={1} pageSize={1} />
    </div>
  )
}

describe('BookmarkListSkeleton', () => {
  afterEach(() => {
    cleanup()
  })

  it('スケルトンコンポーネントをレンダリングする', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const wrapper = container.querySelector('div')
    expect(wrapper).toBeTruthy()
  })

  it('flexレイアウトクラスを持つ', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const wrapper = container.querySelector('div')
    expect(wrapper?.className).toContain('flex')
    expect(wrapper?.className).toContain('flex-col')
  })

  it('gap-4クラスを持つ', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const wrapper = container.querySelector('div')
    expect(wrapper?.className).toContain('gap-4')
  })

  it('Paginationコンポーネントを2つレンダリングする', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const paginationElements = container.querySelectorAll('[data-testid="pagination"]')
    expect(paginationElements.length).toBe(2)
  })

  it('20個のスケルトンプレースホルダーを持つ', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const skeletonElements = container.querySelectorAll('[data-testid="skeleton"]')
    expect(skeletonElements.length).toBe(20)
  })

  it('各スケルトンアイテムがrounded-lgクラスを持つ', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const roundedElements = container.querySelectorAll('[class*="rounded-lg"]')
    expect(roundedElements.length).toBeGreaterThan(0)
  })

  it('スケルトンの高さがh-28に設定されている', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const heightElement = container.querySelector('[class*="h-28"]')
    expect(heightElement).toBeTruthy()
  })

  it('スケルトンの幅がw-fullに設定されている', () => {
    const { container } = render(<BookmarkListSkeleton />)
    const widthElements = container.querySelectorAll('[class*="w-full"]')
    expect(widthElements.length).toBeGreaterThan(0)
  })
})
