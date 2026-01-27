import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import { tagListItemFactory, tagListItemWithZeroPublishedFactory } from '@/../tests/factories/tag'

import TagList from '../tag-list'

import type { TagList as TagListType } from '@/lib/hackersheet'

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
    <a href={href} className={className} data-testid="tag-card">
      {children}
    </a>
  ),
}))

vi.mock('../color-circle', () => ({
  default: ({ value, size, glow }: { value: string; size?: string; glow?: boolean }) => (
    <span
      data-testid="color-circle"
      data-value={value}
      data-size={size}
      data-glow={glow?.toString()}
    />
  ),
}))

// ============================================================================
// Test Data
// ============================================================================

const mockTags: TagListType = [
  tagListItemFactory.build({ id: '1', name: 'React', documentCountInPublished: 5 }),
  tagListItemFactory.build({ id: '2', name: 'TypeScript', documentCountInPublished: 3 }),
  tagListItemFactory.build({ id: '3', name: 'Next.js', documentCountInPublished: 2 }),
]

const mockTagsWithZeroCount: TagListType = [
  tagListItemFactory.build({ id: '1', name: 'React', documentCountInPublished: 5 }),
  tagListItemWithZeroPublishedFactory.build({ id: '2', name: 'EmptyTag' }),
  tagListItemFactory.build({ id: '3', name: 'TypeScript', documentCountInPublished: 3 }),
]

// ============================================================================
// Helpers
// ============================================================================

const renderComponent = async (tags: TagListType = mockTags) => {
  // TagList は async コンポーネントなので await する
  const Component = await TagList({ tags })
  return render(Component)
}

describe('TagList', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本レンダリング', () => {
    it('グリッドコンテナが表示される', async () => {
      const { container } = await renderComponent()
      const grid = container.querySelector('div.grid')

      expect(grid).toBeInTheDocument()
    })

    it('すべてのタグがカードとして表示される', async () => {
      const { container } = await renderComponent()
      const cards = container.querySelectorAll('[data-testid="tag-card"]')

      expect(cards).toHaveLength(3)
    })
  })

  describe('タグ情報の表示', () => {
    it('タグ名が表示される', async () => {
      await renderComponent()

      expect(document.body).toHaveTextContent('React')
      expect(document.body).toHaveTextContent('TypeScript')
      expect(document.body).toHaveTextContent('Next.js')
    })

    it('ドキュメント数が表示される', async () => {
      await renderComponent()

      expect(document.body).toHaveTextContent('5 docs')
      expect(document.body).toHaveTextContent('3 docs')
      expect(document.body).toHaveTextContent('2 docs')
    })
  })

  describe('フィルタリング', () => {
    it('documentCountInPublished が 0 のタグはフィルタリングされる', async () => {
      const { container } = await renderComponent(mockTagsWithZeroCount)
      const cards = container.querySelectorAll('[data-testid="tag-card"]')

      // 3つのタグのうち、0件のものを除いた2つだけ表示
      expect(cards).toHaveLength(2)
      expect(document.body).not.toHaveTextContent('EmptyTag')
    })

    it('すべて 0 件の場合は何も表示しない', async () => {
      const zeroTags: TagListType = tagListItemWithZeroPublishedFactory.buildList(2)
      const { container } = await renderComponent(zeroTags)
      const cards = container.querySelectorAll('[data-testid="tag-card"]')

      expect(cards).toHaveLength(0)
    })
  })

  describe('リンク', () => {
    it('各タグは正しい URL にリンクする', async () => {
      const { container } = await renderComponent()
      const cards = container.querySelectorAll('[data-testid="tag-card"]')

      expect((cards[0] as HTMLAnchorElement).href).toContain('/tags/React')
      expect((cards[1] as HTMLAnchorElement).href).toContain('/tags/TypeScript')
      expect((cards[2] as HTMLAnchorElement).href).toContain('/tags/Next.js')
    })
  })

  describe('ColorCircle コンポーネント', () => {
    it('各タグに ColorCircle が含まれている', async () => {
      const { container } = await renderComponent()
      const circles = container.querySelectorAll('[data-testid="color-circle"]')

      expect(circles).toHaveLength(3)
    })

    it('ColorCircle にタグ名が渡される', async () => {
      const { container } = await renderComponent()
      const circles = container.querySelectorAll('[data-testid="color-circle"]')

      expect(circles[0]).toHaveAttribute('data-value', 'React')
      expect(circles[1]).toHaveAttribute('data-value', 'TypeScript')
      expect(circles[2]).toHaveAttribute('data-value', 'Next.js')
    })

    it('ColorCircle に size="md" が渡される', async () => {
      const { container } = await renderComponent()
      const circle = container.querySelector('[data-testid="color-circle"]')

      expect(circle).toHaveAttribute('data-size', 'md')
    })

    it('ColorCircle に glow=true が渡される', async () => {
      const { container } = await renderComponent()
      const circle = container.querySelector('[data-testid="color-circle"]')

      expect(circle).toHaveAttribute('data-glow', 'true')
    })
  })

  describe('空の配列', () => {
    it('タグ配列が空の場合は何も表示しない', async () => {
      const { container } = await renderComponent([])
      const cards = container.querySelectorAll('[data-testid="tag-card"]')

      expect(cards).toHaveLength(0)
    })
  })

  describe('スタイリング', () => {
    it('カードに rounded-xl クラスが適用されている', async () => {
      const { container } = await renderComponent()
      const card = container.querySelector('[data-testid="tag-card"]')

      expect(card?.className).toContain('rounded-xl')
    })

    it('カードに transition-all クラスが適用されている', async () => {
      const { container } = await renderComponent()
      const card = container.querySelector('[data-testid="tag-card"]')

      expect(card?.className).toContain('transition-all')
    })
  })

  describe('ファクトリーを使ったランダムデータ', () => {
    it('ランダムに生成されたタグリストが正しく表示される', async () => {
      const randomTags = tagListItemFactory.buildList(5)
      const { container } = await renderComponent(randomTags)
      const cards = container.querySelectorAll('[data-testid="tag-card"]')

      expect(cards).toHaveLength(5)
    })
  })
})
