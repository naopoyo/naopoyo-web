import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import SmallTag from '../small-tag'

// ============================================================================
// Mocks
// ============================================================================

vi.mock('@/components/navigations/link', () => ({
  NextLink: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('../color-circle', () => ({
  default: ({ value, size }: { value: string; size?: string }) => (
    <span data-testid="color-circle" data-value={value} data-size={size} />
  ),
}))

// ============================================================================
// Helpers
// ============================================================================

const renderComponent = (props: { tagName: string; className?: string }) => {
  return render(<SmallTag {...props} />)
}

describe('SmallTag', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本レンダリング', () => {
    it('タグ名が表示される', () => {
      renderComponent({ tagName: 'React' })

      expect(document.body).toHaveTextContent('React')
    })

    it('リンクとしてレンダリングされる', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const link = container.querySelector('a')

      expect(link).toBeInTheDocument()
    })
  })

  describe('リンク', () => {
    it('正しい URL にリンクする (/tags/{tagName})', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const link = container.querySelector('a') as HTMLAnchorElement

      expect(link.href).toContain('/tags/React')
    })

    it('日本語タグ名でも正しくリンクする', () => {
      const { container } = renderComponent({ tagName: 'テスト' })
      const link = container.querySelector('a') as HTMLAnchorElement

      // URLエンコードされた形式でも元の文字列でも検証できるようにデコードして比較
      expect(decodeURIComponent(link.href)).toContain('/tags/テスト')
    })

    it('特殊文字を含むタグ名でも正しくリンクする', () => {
      const { container } = renderComponent({ tagName: 'C++' })
      const link = container.querySelector('a') as HTMLAnchorElement

      expect(link.href).toContain('/tags/C++')
    })
  })

  describe('ColorCircle コンポーネント', () => {
    it('ColorCircle が含まれている', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const colorCircle = container.querySelector('[data-testid="color-circle"]')

      expect(colorCircle).toBeInTheDocument()
    })

    it('ColorCircle にタグ名が渡される', () => {
      const { container } = renderComponent({ tagName: 'TypeScript' })
      const colorCircle = container.querySelector('[data-testid="color-circle"]')

      expect(colorCircle).toHaveAttribute('data-value', 'TypeScript')
    })

    it('ColorCircle に size="sm" が渡される', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const colorCircle = container.querySelector('[data-testid="color-circle"]')

      expect(colorCircle).toHaveAttribute('data-size', 'sm')
    })
  })
})
