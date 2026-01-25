import { render, cleanup } from '@testing-library/react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import NavBarMenu from '../nav-bar-menu'

interface MockLinkProps extends PropsWithChildren {
  href: string
  className?: string
}

// next/link をモック化
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: MockLinkProps) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

vi.mock('next/navigation', () => ({
  useSelectedLayoutSegment: vi.fn(),
}))

const mockUseSelectedLayoutSegment = vi.mocked(useSelectedLayoutSegment)

describe('NavBarMenu', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('メニューアイテムを5個表示する', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)

    const { container } = render(<NavBarMenu />)
    const items = container.querySelectorAll('li')

    expect(items).toHaveLength(5)
  })

  it('正しいメニューラベルを表示する', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)

    const { container } = render(<NavBarMenu />)
    const links = container.querySelectorAll('a')

    const labels = Array.from(links).map((link) => link.textContent)
    expect(labels).toEqual(['Docs', 'Tags', 'Bookmarks', 'Tools', 'About'])
  })

  it('各メニューアイテムに正しいhref属性を設定する', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)

    const { container } = render(<NavBarMenu />)
    const links = container.querySelectorAll('a')

    const hrefs = Array.from(links).map((link) => link.getAttribute('href'))
    expect(hrefs).toEqual(['/docs', '/tags', '/bookmarks', '/tools', '/about'])
  })

  it('アクティブなセグメント下部に下線を表示する', () => {
    mockUseSelectedLayoutSegment.mockReturnValue('docs')

    const { container } = render(<NavBarMenu />)
    const items = container.querySelectorAll('li')
    const firstItem = items[0]

    const underline = firstItem?.querySelector('div.border-b')
    expect(underline).toBeInTheDocument()
  })

  it('非アクティブなセグメント下部には下線を表示しない', () => {
    mockUseSelectedLayoutSegment.mockReturnValue('docs')

    const { container } = render(<NavBarMenu />)
    const items = container.querySelectorAll('li')

    // Docsはアクティブ、他は非アクティブ
    for (let i = 1; i < items.length; i++) {
      const underline = items[i]?.querySelector('div.border-b')
      expect(underline).not.toBeInTheDocument()
    }
  })

  it('異なるセグメントに切り替えると下線が移動する', () => {
    mockUseSelectedLayoutSegment.mockReturnValue('docs')
    const { container, rerender } = render(<NavBarMenu />)

    let items = container.querySelectorAll('li')
    expect(items[0]?.querySelector('div.border-b')).toBeInTheDocument()
    expect(items[1]?.querySelector('div.border-b')).not.toBeInTheDocument()

    // セグメントを'tags'に切り替え
    mockUseSelectedLayoutSegment.mockReturnValue('tags')
    rerender(<NavBarMenu />)

    items = container.querySelectorAll('li')
    expect(items[0]?.querySelector('div.border-b')).not.toBeInTheDocument()
    expect(items[1]?.querySelector('div.border-b')).toBeInTheDocument()
  })

  it('セグメントが null の場合、下線を表示しない', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)

    const { container } = render(<NavBarMenu />)
    const underlines = container.querySelectorAll('div.border-b')

    expect(underlines).toHaveLength(0)
  })

  it('存在しないセグメントの場合、下線を表示しない', () => {
    mockUseSelectedLayoutSegment.mockReturnValue('nonexistent')

    const { container } = render(<NavBarMenu />)
    const underlines = container.querySelectorAll('div.border-b')

    expect(underlines).toHaveLength(0)
  })

  it('ul要素でレンダリングされる', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)

    const { container } = render(<NavBarMenu />)
    const ul = container.querySelector('ul')

    expect(ul).toBeInTheDocument()
  })

  it('flexレイアウトでスタイリングされている', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)

    const { container } = render(<NavBarMenu />)
    const ul = container.querySelector('ul')

    expect(ul).toHaveClass('flex')
    expect(ul).toHaveClass('items-center')
    expect(ul).toHaveClass('gap-2')
  })

  it('各リンク要素に適切なクラスが設定されている', () => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)

    const { container } = render(<NavBarMenu />)
    const links = container.querySelectorAll('a')

    links.forEach((link) => {
      expect(link).toHaveClass('inline-block')
      expect(link).toHaveClass('rounded-sm')
      expect(link).toHaveClass('px-4')
      expect(link).toHaveClass('py-2')
    })
  })
})
