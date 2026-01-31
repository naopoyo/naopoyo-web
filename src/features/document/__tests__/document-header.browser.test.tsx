import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import {
  documentFactory,
  documentWithTagsFactory,
  documentWithPreviewFactory,
  documentWithModifiedDateFactory,
} from '@tests/factories/document'

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
  createDateFormat: () => (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toISOString().split('T')[0]
  },
  timeAgo: (date: string | Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    return `${days} days ago`
  },
}))

const renderComponent = (document?: Document) => {
  const testDoc = document || documentFactory.build()
  return render(<DocumentHeader document={testDoc} />)
}

describe('DocumentHeader', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本動作', () => {
    it('ドキュメントのタイトルを表示する', () => {
      const title = 'Test Document Title'
      const { container } = renderComponent(documentFactory.build({ title }))
      const heading = container.querySelector('h1')

      expect(heading?.textContent).toContain(title)
    })

    it('ドキュメントの絵文字を表示する', () => {
      const emoji = '😀'
      const { container } = renderComponent(documentFactory.build({ emoji }))
      const emojiElement = container.querySelector('[data-testid="emoji"]')

      expect(emojiElement).toBeInTheDocument()
      expect(emojiElement?.textContent).toBe(emoji)
    })

    it('公開日を表示する', () => {
      const { container } = renderComponent()
      const dateElements = container.querySelectorAll('div')

      expect(Array.from(dateElements).some((el) => el.textContent?.includes('公開日'))).toBe(true)
    })
  })

  describe('更新日の表示', () => {
    it('更新日が公開日と異なる場合は更新日を表示する', () => {
      const docWithModified = documentWithModifiedDateFactory.build()

      const { container } = renderComponent(docWithModified)
      const allText = container.textContent || ''

      expect(allText.includes('更新日')).toBe(true)
    })

    it('更新日が公開日と同じ場合は更新日を表示しない', () => {
      const docWithoutModified = documentFactory.build()

      const { container } = renderComponent(docWithoutModified)
      const allText = container.textContent || ''

      expect(allText.includes('更新日')).toBe(false)
    })
  })

  describe('タグの表示', () => {
    it('タグがある場合はタグを表示する', () => {
      const docWithTags = documentWithTagsFactory.build()

      const { container } = renderComponent(docWithTags)
      const tags = container.querySelectorAll('[data-testid="tag"]')

      expect(tags.length).toBe(2)
      expect(tags[0].textContent).toBe('JavaScript')
      expect(tags[1].textContent).toBe('React')
    })

    it('タグがない場合はタグセクションを表示しない', () => {
      const docWithoutTags = documentFactory.build({ tags: [] })
      const { container } = renderComponent(docWithoutTags)
      const tags = container.querySelectorAll('[data-testid="tag"]')

      expect(tags.length).toBe(0)
    })
  })

  describe('GitHub リンク', () => {
    it('GitHub リンクを表示する', () => {
      const { container } = renderComponent()
      const link = container.querySelector('[data-testid="github-link"]')

      expect(link).toBeInTheDocument()
      expect(link?.textContent).toContain('GitHubで見る')
    })

    it('GitHub リンクが正しい URL を持つ', () => {
      const path = 'test-document.md'
      const { container } = renderComponent(documentFactory.build({ path }))
      const link = container.querySelector('[data-testid="github-link"]') as HTMLAnchorElement

      expect(link?.href).toContain('https://github.com/example/repo')
      expect(link?.href).toContain(path)
    })
  })

  describe('プレビュー画像', () => {
    it('プレビュー画像がある場合は表示する', () => {
      const docWithPreview = documentWithPreviewFactory.build()

      const { container } = renderComponent(docWithPreview)
      const img = container.querySelector('img')

      expect(img).toBeInTheDocument()
      expect(img?.src).toBe(docWithPreview.preview?.fileUrl)
      expect(img?.getAttribute('width')).toBe('800')
      expect(img?.getAttribute('height')).toBe('600')
    })

    it('プレビュー画像がない場合は表示しない', () => {
      const docWithoutPreview = documentFactory.build({ preview: null })
      const { container } = renderComponent(docWithoutPreview)
      const imgs = container.querySelectorAll('img')

      expect(imgs.length).toBe(0)
    })
  })
})
