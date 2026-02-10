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

  it('指定された数のスケルトンカードが表示される', () => {
    const { container } = renderComponent(3)
    const skeletons = container.querySelectorAll('[data-testid="skeleton"]')

    expect(skeletons.length).toBe(3 * SKELETONS_PER_CARD)
  })

  it('length を変更するとカード数が変わる', () => {
    const { container, rerender } = renderComponent(5)
    expect(container.querySelectorAll('[data-testid="skeleton"]').length).toBe(
      5 * SKELETONS_PER_CARD
    )

    rerender(<DocumentListSkeleton length={2} />)
    expect(container.querySelectorAll('[data-testid="skeleton"]').length).toBe(
      2 * SKELETONS_PER_CARD
    )
  })

  it('length が 0 の場合はスケルトンを表示しない', () => {
    const { container } = renderComponent(0)

    expect(container.querySelectorAll('[data-testid="skeleton"]').length).toBe(0)
  })
})
