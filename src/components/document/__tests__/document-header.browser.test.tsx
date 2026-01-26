import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import DocumentHeader from '../document-header'

import type { Document } from '@/lib/hackersheet'

vi.mock('@/components/document', () => ({
  DocumentEmoji: ({ emoji }: { emoji: string }) => <div data-testid="emoji">{emoji}</div>,
}))

vi.mock('@/components/link', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="github-link">
      {children}
    </a>
  ),
}))

vi.mock('@/components/tag', () => ({
  SmallTag: ({ tagName }: { tagName: string }) => <span data-testid="tag">{tagName}</span>,
}))

vi.mock('@/constants', () => ({
  HACKERSHEET_GITHUB_REPO_URL: 'https://github.com/example/repo',
}))

vi.mock('@/utils', () => ({
  createDateFormat: () => (date: Date) => date.toISOString().split('T')[0],
  timeAgo: (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return `${days} days ago`
  },
}))

describe('DocumentHeader', () => {
  afterEach(() => cleanup())

  const publishedDate = new Date('2024-01-01')

  const mockDocument: Document = {
    id: '1',
    title: 'Test Document',
    emoji: '😀',
    slug: 'test-document',
    path: 'test-document.md',
    description: 'Test description',
    content: 'Test content',
    publishedAt: publishedDate,
    modifiedAt: publishedDate,
    preview: null,
    tags: [],
  }

  describe('基本動作', () => {
    it('ドキュメントのタイトルを表示する', () => {
      const { container } = render(<DocumentHeader document={mockDocument} />)
      const heading = container.querySelector('h1')

      expect(heading?.textContent).toContain('Test Document')
    })

    it('ドキュメントの絵文字を表示する', () => {
      const { container } = render(<DocumentHeader document={mockDocument} />)
      const emoji = container.querySelector('[data-testid="emoji"]')

      expect(emoji).toBeInTheDocument()
      expect(emoji?.textContent).toBe('😀')
    })

    it('公開日を表示する', () => {
      const { container } = render(<DocumentHeader document={mockDocument} />)
      const dateElements = container.querySelectorAll('div')

      expect(Array.from(dateElements).some((el) => el.textContent?.includes('公開日'))).toBe(true)
    })
  })

  describe('更新日の表示', () => {
    it('更新日が公開日と異なる場合は更新日を表示する', () => {
      const publishedDate = new Date('2024-01-01')
      const modifiedDate = new Date('2024-01-15')

      const docWithModified: Document = {
        ...mockDocument,
        publishedAt: publishedDate,
        modifiedAt: modifiedDate,
      }

      const { container } = render(<DocumentHeader document={docWithModified} />)
      const allText = container.textContent || ''

      expect(allText.includes('更新日')).toBe(true)
    })

    it('更新日が公開日と同じ場合は更新日を表示しない', () => {
      const sameDate = new Date('2024-01-01')

      const docWithoutModified: Document = {
        ...mockDocument,
        publishedAt: sameDate,
        modifiedAt: sameDate,
      }

      const { container } = render(<DocumentHeader document={docWithoutModified} />)
      const allText = container.textContent || ''

      expect(allText.includes('更新日')).toBe(false)
    })
  })

  describe('タグの表示', () => {
    it('タグがある場合はタグを表示する', () => {
      const docWithTags: Document = {
        ...mockDocument,
        tags: [
          { id: '1', name: 'JavaScript' },
          { id: '2', name: 'React' },
        ],
      }

      const { container } = render(<DocumentHeader document={docWithTags} />)
      const tags = container.querySelectorAll('[data-testid="tag"]')

      expect(tags.length).toBe(2)
      expect(tags[0].textContent).toBe('JavaScript')
      expect(tags[1].textContent).toBe('React')
    })

    it('タグがない場合はタグセクションを表示しない', () => {
      const { container } = render(<DocumentHeader document={mockDocument} />)
      const tags = container.querySelectorAll('[data-testid="tag"]')

      expect(tags.length).toBe(0)
    })
  })

  describe('GitHub リンク', () => {
    it('GitHub リンクを表示する', () => {
      const { container } = render(<DocumentHeader document={mockDocument} />)
      const link = container.querySelector('[data-testid="github-link"]')

      expect(link).toBeInTheDocument()
      expect(link?.textContent).toBe('GitHubで見る')
    })

    it('GitHub リンクが正しい URL を持つ', () => {
      const { container } = render(<DocumentHeader document={mockDocument} />)
      const link = container.querySelector('[data-testid="github-link"]') as HTMLAnchorElement

      expect(link?.href).toContain('https://github.com/example/repo')
      expect(link?.href).toContain('test-document.md')
    })
  })

  describe('プレビュー画像', () => {
    it('プレビュー画像がある場合は表示する', () => {
      const docWithPreview: Document = {
        ...mockDocument,
        preview: {
          fileUrl: 'https://example.com/preview.jpg',
          width: 800,
          height: 600,
        },
      }

      const { container } = render(<DocumentHeader document={docWithPreview} />)
      const img = container.querySelector('img')

      expect(img).toBeInTheDocument()
      expect(img?.src).toBe('https://example.com/preview.jpg')
      expect(img?.getAttribute('width')).toBe('800')
      expect(img?.getAttribute('height')).toBe('600')
    })

    it('プレビュー画像がない場合は表示しない', () => {
      const { container } = render(<DocumentHeader document={mockDocument} />)
      const imgs = Array.from(container.querySelectorAll('img')).filter(
        (img) => img.src.includes('example.com/preview')
      )

      expect(imgs.length).toBe(0)
    })
  })
})
