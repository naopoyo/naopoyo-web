import { render, cleanup } from '@testing-library/react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'

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

const renderComponent = () => {
  return render(<NavBarMenu />)
}

describe('NavBarMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('レンダリング', () => {
    it('メニューアイテムを5個表示する（ホバーインジケーター含め6個）', () => {
      mockUseSelectedLayoutSegment.mockReturnValue(null)

      const { container } = renderComponent()
      const items = container.querySelectorAll('li')
      // 5つのメニューアイテム + 1つのホバーインジケーター
      expect(items).toHaveLength(6)
    })

    it('正しいメニューラベルを表示する', () => {
      mockUseSelectedLayoutSegment.mockReturnValue(null)

      const { container } = renderComponent()
      const links = container.querySelectorAll('a')

      const labels = Array.from(links).map((link) => link.textContent)
      expect(labels).toEqual(['Docs', 'Tags', 'Bookmarks', 'Tools', 'About'])
    })

    it('各メニューアイテムに正しいhref属性を設定する', () => {
      mockUseSelectedLayoutSegment.mockReturnValue(null)

      const { container } = renderComponent()
      const links = container.querySelectorAll('a')

      const hrefs = Array.from(links).map((link) => link.getAttribute('href'))
      expect(hrefs).toEqual(['/docs', '/tags', '/bookmarks', '/tools', '/about'])
    })
  })

  describe('アクティブ状態', () => {
    it('アクティブなセグメントでインジケーターが表示される', () => {
      mockUseSelectedLayoutSegment.mockReturnValue('docs')

      const { container } = renderComponent()
      // ホバーインジケーター（index 0）をスキップして、メニューアイテムを取得
      const menuItems = container.querySelectorAll('li:not([aria-hidden="true"])')
      const firstItem = menuItems[0]

      // アクティブインジケーター（span.bg-link）が表示されている（scale-x-100）
      const indicator = firstItem?.querySelector('span.bg-link')
      expect(indicator).toBeInTheDocument()
      expect(indicator).toHaveClass('scale-x-100')
    })

    it('非アクティブなセグメントではインジケーターが非表示', () => {
      mockUseSelectedLayoutSegment.mockReturnValue('docs')

      const { container } = renderComponent()
      const menuItems = container.querySelectorAll('li:not([aria-hidden="true"])')

      // Docsはアクティブ、他は非アクティブ（scale-x-0）
      for (let i = 1; i < menuItems.length; i++) {
        const indicator = menuItems[i]?.querySelector('span.bg-link')
        expect(indicator).toHaveClass('scale-x-0')
      }
    })

    it('異なるセグメントに切り替えるとインジケーターが移動する', () => {
      mockUseSelectedLayoutSegment.mockReturnValue('docs')
      const { container, rerender } = renderComponent()

      let menuItems = container.querySelectorAll('li:not([aria-hidden="true"])')
      expect(menuItems[0]?.querySelector('span.bg-link')).toHaveClass('scale-x-100')
      expect(menuItems[1]?.querySelector('span.bg-link')).toHaveClass('scale-x-0')

      // セグメントを'tags'に切り替え
      mockUseSelectedLayoutSegment.mockReturnValue('tags')
      rerender(<NavBarMenu />)

      menuItems = container.querySelectorAll('li:not([aria-hidden="true"])')
      expect(menuItems[0]?.querySelector('span.bg-link')).toHaveClass('scale-x-0')
      expect(menuItems[1]?.querySelector('span.bg-link')).toHaveClass('scale-x-100')
    })

    it('セグメントが null の場合、全てのインジケーターが非表示', () => {
      mockUseSelectedLayoutSegment.mockReturnValue(null)

      const { container } = renderComponent()
      const activeIndicators = container.querySelectorAll('span.bg-link.scale-x-100')

      expect(activeIndicators).toHaveLength(0)
    })

    it('存在しないセグメントの場合、全てのインジケーターが非表示', () => {
      mockUseSelectedLayoutSegment.mockReturnValue('nonexistent')

      const { container } = renderComponent()
      const activeIndicators = container.querySelectorAll('span.bg-link.scale-x-100')

      expect(activeIndicators).toHaveLength(0)
    })
  })

  describe('スタイリング', () => {
    it('ul要素でレンダリングされる', () => {
      mockUseSelectedLayoutSegment.mockReturnValue(null)

      const { container } = renderComponent()
      const ul = container.querySelector('ul')

      expect(ul).toBeInTheDocument()
    })

    it('flexレイアウトでスタイリングされている', () => {
      mockUseSelectedLayoutSegment.mockReturnValue(null)

      const { container } = renderComponent()
      const ul = container.querySelector('ul')

      expect(ul).toHaveClass('flex')
      expect(ul).toHaveClass('items-center')
      expect(ul).toHaveClass('gap-2')
    })

    it('各リンク要素に適切なクラスが設定されている', () => {
      mockUseSelectedLayoutSegment.mockReturnValue(null)

      const { container } = renderComponent()
      const links = container.querySelectorAll('a')

      links.forEach((link) => {
        expect(link).toHaveClass('inline-block')
        expect(link).toHaveClass('px-4')
        expect(link).toHaveClass('py-2')
        expect(link).toHaveClass('z-10')
      })
    })
  })
})
