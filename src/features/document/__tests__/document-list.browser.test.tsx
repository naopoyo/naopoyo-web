import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import {
  documentListItemFactory,
  documentListItemWithTagsFactory,
} from '@/../tests/factories/document'

import DocumentList from '../document-list'

// ============================================================================
// Mocks
// ============================================================================

vi.mock('../document-emoji', () => ({
  default: ({ emoji }: { emoji: string }) => <div data-testid="emoji">{emoji}</div>,
}))

vi.mock('@/components/navigations/link', () => ({
  NextLink: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}))

vi.mock('@/utils', () => ({
  createDateFormat: () => (date: Date) => new Date(date).toLocaleDateString('ja-JP'),
  timeAgo: (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return `${days}日前`
  },
}))

// ============================================================================
// Test Data
// ============================================================================

const mockDocuments = [
  documentListItemFactory.build({
    id: '1',
    title: 'Document 1',
    emoji: '😀',
    slug: 'doc-1',
  }),
  documentListItemWithTagsFactory.build({
    id: '2',
    title: 'Document 2',
    emoji: '🎉',
    slug: 'doc-2',
    tags: [{ id: '1', name: 'React' }],
  }),
]

// ============================================================================
// Helpers
// ============================================================================

const renderComponent = (documents = mockDocuments) => {
  return render(<DocumentList documents={documents} />)
}

describe('DocumentList', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本動作', () => {
    it('グリッドコンテナが表示される', () => {
      const { container } = renderComponent()
      expect(container.querySelector('div.grid')).toBeInTheDocument()
    })

    it('各ドキュメントがカードとして表示される', () => {
      const { container } = renderComponent()
      const links = container.querySelectorAll('a[href]')
      expect(links).toHaveLength(2)
    })
  })

  describe('ドキュメント情報の表示', () => {
    it('ドキュメントのタイトルが表示される', () => {
      renderComponent()
      expect(document.body).toHaveTextContent('Document 1')
      expect(document.body).toHaveTextContent('Document 2')
    })

    it('ドキュメントの絵文字が表示される', () => {
      const { container } = renderComponent()
      const emojis = container.querySelectorAll('[data-testid="emoji"]')

      expect(emojis).toHaveLength(2)
      expect(emojis[0]).toHaveTextContent('😀')
      expect(emojis[1]).toHaveTextContent('🎉')
    })

    it('タグがある場合は表示される', () => {
      renderComponent()
      expect(document.body).toHaveTextContent('React')
    })
  })

  describe('リンク', () => {
    it('各ドキュメントは正しい URL にリンクする', () => {
      const { container } = renderComponent()
      const links = container.querySelectorAll('a[href]')

      expect((links[0] as HTMLAnchorElement).href).toContain('/docs/doc-1')
      expect((links[1] as HTMLAnchorElement).href).toContain('/docs/doc-2')
    })
  })

  describe('空の配列', () => {
    it('ドキュメント配列が空の場合は何も表示しない', () => {
      const { container } = renderComponent([])
      expect(container.querySelectorAll('a[href]')).toHaveLength(0)
    })
  })
})
