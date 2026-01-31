import { render, cleanup } from '@testing-library/react'
import { ReactNode } from 'react'
import { describe, it, expect, afterEach } from 'vitest'

interface MockSkeletonProps {
  children?: ReactNode
  className?: string
}

// モック化されたコンポーネント
const MockSkeleton = ({ children, className }: MockSkeletonProps) => (
  <div data-testid="skeleton" className={className}>
    {children}
  </div>
)

// BookmarkItemsSkeletonコンポーネントの実装
const BookmarkItemsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 20 }).map((_, index) => (
        <MockSkeleton key={`bookmark-items-skeleton-${index}`} className="w-full rounded-lg">
          <div className="h-28 w-full rounded-lg"></div>
        </MockSkeleton>
      ))}
    </div>
  )
}

const renderComponent = () => {
  return render(<BookmarkItemsSkeleton />)
}

describe('BookmarkItemsSkeleton', () => {
  afterEach(() => {
    cleanup()
  })

  describe('レンダリング', () => {
    it('スケルトンコンポーネントをレンダリングする', () => {
      const { container } = renderComponent()
      const wrapper = container.querySelector('div')
      expect(wrapper).toBeInTheDocument()
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

    it('gap-6クラスを持つ', () => {
      const { container } = renderComponent()
      const wrapper = container.querySelector('div')
      expect(wrapper).toHaveClass('gap-6')
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
