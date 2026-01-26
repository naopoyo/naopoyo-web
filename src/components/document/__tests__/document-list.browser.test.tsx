import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import DocumentList from '../document-list'

import type { DocumentList as DocumentListType } from '@/lib/hackersheet'

vi.mock('../document-emoji', () => ({
  default: ({ emoji }: { emoji: string }) => <div data-testid="emoji">{emoji}</div>,
}))

interface NextLinkProps {
  children?: React.ReactNode
  href?: string
  className?: string
}

vi.mock('@/components/link', () => ({
  NextLink: ({ children, href, className }: NextLinkProps) => (
    <a href={href} className={className} data-testid="doc-link">
      {children}
    </a>
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

describe('DocumentList', () => {
  afterEach(() => cleanup())

  const mockDocuments: DocumentListType = [
    {
      id: '1',
      title: 'Document 1',
      emoji: '😀',
      slug: 'doc-1',
      path: 'doc-1.md',
      description: 'Description 1',
      content: 'Content 1',
      publishedAt: new Date('2024-01-01'),
      modifiedAt: new Date('2024-01-01'),
      preview: null,
      tags: [],
    },
    {
      id: '2',
      title: 'Document 2',
      emoji: '🎉',
      slug: 'doc-2',
      path: 'doc-2.md',
      description: 'Description 2',
      content: 'Content 2',
      publishedAt: new Date('2024-01-02'),
      modifiedAt: new Date('2024-01-02'),
      preview: null,
      tags: [{ id: '1', name: 'React' }],
    },
  ]

  describe('基本動作', () => {
    it('グリッドコンテナが表示される', () => {
      const { container } = render(<DocumentList documents={mockDocuments} />)
      const grid = container.querySelector('div.grid')

      expect(grid).toBeInTheDocument()
    })

    it('各ドキュメントがカードとして表示される', () => {
      const { container } = render(<DocumentList documents={mockDocuments} />)
      const links = container.querySelectorAll('[data-testid="doc-link"]')

      expect(links.length).toBe(2)
    })
  })

  describe('ドキュメント情報の表示', () => {
    it('ドキュメントのタイトルが表示される', () => {
      const { container } = render(<DocumentList documents={mockDocuments} />)
      const text = container.textContent

      expect(text).toContain('Document 1')
      expect(text).toContain('Document 2')
    })

    it('ドキュメントの絵文字が表示される', () => {
      const { container } = render(<DocumentList documents={mockDocuments} />)
      const emojis = container.querySelectorAll('[data-testid="emoji"]')

      expect(emojis.length).toBe(2)
      expect(emojis[0].textContent).toBe('😀')
      expect(emojis[1].textContent).toBe('🎉')
    })

    it('タグがある場合は表示される', () => {
      const { container } = render(<DocumentList documents={mockDocuments} />)
      const text = container.textContent

      expect(text).toContain('React')
    })
  })

  describe('リンク', () => {
    it('各ドキュメントは正しい URL にリンクする', () => {
      const { container } = render(<DocumentList documents={mockDocuments} />)
      const links = container.querySelectorAll('[data-testid="doc-link"]')

      expect((links[0] as HTMLAnchorElement).href).toContain('/docs/doc-1')
      expect((links[1] as HTMLAnchorElement).href).toContain('/docs/doc-2')
    })
  })

  describe('空の配列', () => {
    it('ドキュメント配列が空の場合は何も表示しない', () => {
      const { container } = render(<DocumentList documents={[]} />)
      const links = container.querySelectorAll('[data-testid="doc-link"]')

      expect(links.length).toBe(0)
    })
  })
})
