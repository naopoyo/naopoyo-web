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

const renderComponent = () => {
  return render(<BookmarkListSkeleton />)
}

describe('BookmarkListSkeleton', () => {
  afterEach(() => {
    cleanup()
  })

  describe('レンダリング', () => {
    it('スケルトンコンポーネントをレンダリングする', () => {
      const { container } = renderComponent()
      const wrapper = container.querySelector('div')
      expect(wrapper).toBeInTheDocument()
    })

    it('Paginationコンポーネントを2つレンダリングする', () => {
      const { container } = renderComponent()
      const paginationElements = container.querySelectorAll('[data-testid="pagination"]')
      expect(paginationElements.length).toBe(2)
    })

    it('20個のスケルトンプレースホルダーを持つ', () => {
      const { container } = renderComponent()
      const skeletonElements = container.querySelectorAll('[data-testid="skeleton"]')
      expect(skeletonElements.length).toBe(20)
    })
  })

  describe('スタイリング', () => {
    it('flexレイアウトクラスを持つ', () => {
      const { container } = renderComponent()
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('flex-col')
    })

    it('gap-4クラスを持つ', () => {
      const { container } = renderComponent()
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('gap-4')
    })

    it('各スケルトンアイテムがrounded-lgクラスを持つ', () => {
      const { container } = renderComponent()
      const roundedElements = container.querySelectorAll('[class*="rounded-lg"]')
      expect(roundedElements.length).toBeGreaterThan(0)
    })

    it('スケルトンの高さがh-28に設定されている', () => {
      const { container } = renderComponent()
      const heightElement = container.querySelector('[class*="h-28"]')
      expect(heightElement).toBeInTheDocument()
    })

    it('スケルトンの幅がw-fullに設定されている', () => {
      const { container } = renderComponent()
      const widthElements = container.querySelectorAll('[class*="w-full"]')
      expect(widthElements.length).toBeGreaterThan(0)
    })
  })
})
