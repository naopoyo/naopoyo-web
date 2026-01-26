import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import DocumentListSkeleton from '../document-list-skeleton'

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: ({ className }: { className: string }) => (
    <div data-testid="skeleton" className={className} />
  ),
}))

const renderComponent = (length: number) => {
  return render(<DocumentListSkeleton length={length} />)
}

describe('DocumentListSkeleton', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本動作', () => {
    it('グリッドコンテナが表示される', () => {
      const { container } = renderComponent(3)
      const grid = container.querySelector('div.grid')

      expect(grid).toBeInTheDocument()
    })

    it('指定された数のスケルトンが表示される', () => {
      const { container } = renderComponent(3)
      const skeletons = container.querySelectorAll('[data-testid="skeleton"]')

      expect(skeletons.length).toBe(3)
    })

    it('異なる数のスケルトンが表示される', () => {
      const { container, rerender } = renderComponent(5)
      let skeletons = container.querySelectorAll('[data-testid="skeleton"]')
      expect(skeletons.length).toBe(5)

      rerender(<DocumentListSkeleton length={10} />)
      skeletons = container.querySelectorAll('[data-testid="skeleton"]')
      expect(skeletons.length).toBe(10)
    })
  })

  describe('スケルトンの高さ', () => {
    it('各スケルトンに h-75 クラスが設定されている', () => {
      const { container } = renderComponent(2)
      const skeletons = container.querySelectorAll('[data-testid="skeleton"]')

      expect(skeletons[0].className).toContain('h-75')
      expect(skeletons[1].className).toContain('h-75')
    })
  })

  describe('レイアウト', () => {
    it('グリッドが正しいクラスを持つ', () => {
      const { container } = renderComponent(3)
      const grid = container.querySelector('div.grid')

      expect(grid?.className).toContain('grid')
      expect(grid?.className).toContain('gap')
    })
  })

  describe('エッジケース', () => {
    it('length が 0 の場合は何も表示しない', () => {
      const { container } = renderComponent(0)
      const skeletons = container.querySelectorAll('[data-testid="skeleton"]')

      expect(skeletons.length).toBe(0)
    })

    it('length が大きい場合は対応する', () => {
      const { container } = renderComponent(100)
      const skeletons = container.querySelectorAll('[data-testid="skeleton"]')

      expect(skeletons.length).toBe(100)
    })
  })
})
