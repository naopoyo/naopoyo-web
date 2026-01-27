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

/** 各スケルトンカード内の Skeleton 要素数 */
const SKELETONS_PER_CARD = 6

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

    it('指定された数のスケルトンカードが表示される', () => {
      const { container } = renderComponent(3)
      const cards = container.querySelectorAll('[class*="row-span-3"]')

      expect(cards.length).toBe(3)
    })

    it('異なる数のスケルトンカードが表示される', () => {
      const { container, rerender } = renderComponent(5)
      let cards = container.querySelectorAll('[class*="row-span-3"]')
      expect(cards.length).toBe(5)

      rerender(<DocumentListSkeleton length={10} />)
      cards = container.querySelectorAll('[class*="row-span-3"]')
      expect(cards.length).toBe(10)
    })
  })

  describe('スケルトンカードの構造', () => {
    it('各カードにプレビュー・タイトル・メタデータのスケルトンが含まれる', () => {
      const { container } = renderComponent(2)
      const skeletons = container.querySelectorAll('[data-testid="skeleton"]')

      // 各カードに 6 つの Skeleton 要素（プレビュー1 + タイトル2 + メタデータ3）
      expect(skeletons.length).toBe(2 * SKELETONS_PER_CARD)
    })

    it('プレビューエリアに h-32 クラスが設定されている', () => {
      const { container } = renderComponent(1)
      const skeletons = container.querySelectorAll('[data-testid="skeleton"]')
      const previewSkeleton = skeletons[0]

      expect(previewSkeleton.className).toContain('h-32')
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
      const cards = container.querySelectorAll('[class*="row-span-3"]')

      expect(cards.length).toBe(0)
    })

    it('length が大きい場合は対応する', () => {
      const { container } = renderComponent(100)
      const cards = container.querySelectorAll('[class*="row-span-3"]')

      expect(cards.length).toBe(100)
    })
  })
})
