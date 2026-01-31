import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import SmallTag from '../small-tag'

// ============================================================================
// Mocks
// ============================================================================

vi.mock('@/components/link', () => ({
  NextLink: ({
    children,
    href,
    className,
  }: {
    children?: React.ReactNode
    href?: string
    className?: string
  }) => (
    <a href={href} className={className} data-testid="tag-link">
      {children}
    </a>
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
      const link = container.querySelector('[data-testid="tag-link"]')

      expect(link).toBeInTheDocument()
    })
  })

  describe('リンク', () => {
    it('正しい URL にリンクする (/tags/{tagName})', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const link = container.querySelector('[data-testid="tag-link"]') as HTMLAnchorElement

      expect(link.href).toContain('/tags/React')
    })

    it('日本語タグ名でも正しくリンクする', () => {
      const { container } = renderComponent({ tagName: 'テスト' })
      const link = container.querySelector('[data-testid="tag-link"]') as HTMLAnchorElement

      // URLエンコードされた形式でも元の文字列でも検証できるようにデコードして比較
      expect(decodeURIComponent(link.href)).toContain('/tags/テスト')
    })

    it('特殊文字を含むタグ名でも正しくリンクする', () => {
      const { container } = renderComponent({ tagName: 'C++' })
      const link = container.querySelector('[data-testid="tag-link"]') as HTMLAnchorElement

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

  describe('カスタムクラス', () => {
    it('className が指定されない場合はデフォルトクラスのみ適用される', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const link = container.querySelector('[data-testid="tag-link"]')

      expect(link?.className).toContain('inline-flex')
    })

    it('className が指定された場合は追加される', () => {
      const { container } = renderComponent({ tagName: 'React', className: 'custom-class' })
      const link = container.querySelector('[data-testid="tag-link"]')

      expect(link?.className).toContain('custom-class')
    })
  })

  describe('スタイリング', () => {
    it('inline-flex クラスが適用されている', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const link = container.querySelector('[data-testid="tag-link"]')

      expect(link?.className).toContain('inline-flex')
    })

    it('rounded-lg クラスが適用されている', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const link = container.querySelector('[data-testid="tag-link"]')

      expect(link?.className).toContain('rounded-lg')
    })

    it('transition-all クラスが適用されている', () => {
      const { container } = renderComponent({ tagName: 'React' })
      const link = container.querySelector('[data-testid="tag-link"]')

      expect(link?.className).toContain('transition-all')
    })
  })
})
