import { render, cleanup } from '@testing-library/react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

interface MockLinkProps extends PropsWithChildren {
  href: string
  className?: string
}

// next/link をモック化 - シンプルな a タグに置き換え
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: MockLinkProps) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// next/navigation の hooks をモック化
vi.mock('next/navigation', () => ({
  useSelectedLayoutSegment: vi.fn(),
}))

import NavBar from '../nav-bar'

const mockUseSelectedLayoutSegment = vi.mocked(useSelectedLayoutSegment)

const renderComponent = () => {
  return render(<NavBar />)
}

describe('NavBar', () => {
  beforeEach(() => {
    // デフォルトではセグメントなし（ホームページ）
    mockUseSelectedLayoutSegment.mockReturnValue(null)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('レイアウト', () => {
    it('ヘッダーとモバイルメニューを含むレイアウトを表示する', () => {
      const { container } = renderComponent()

      const header = container.querySelector('header')
      const mobileMenuWrapper = container.querySelector('div.sticky')

      expect(header).toBeInTheDocument()
      expect(mobileMenuWrapper).toBeInTheDocument()
    })

    it('ロゴが「naopoyo.com」を表示する', () => {
      const { container } = renderComponent()

      const logoLink = container.querySelector('a[href="/"]')
      expect(logoLink?.textContent).toBe('naopoyo.com')
    })

    it('ヘッダーが正しいクラス名を持つ', () => {
      const { container } = renderComponent()

      const header = container.querySelector('header')
      expect(header).toHaveClass('container')
      expect(header).toHaveClass('mx-auto')
      expect(header).toHaveClass('flex')
      expect(header).toHaveClass('h-16')
      expect(header).toHaveClass('backdrop-blur-xl')
    })
  })

  describe('デスクトップメニュー', () => {
    it('デスクトップメニューが表示される', () => {
      const { container } = renderComponent()

      const desktopMenu = container.querySelector('div.hidden.sm\\:flex')
      expect(desktopMenu).toBeInTheDocument()
    })

    it('モバイル表示では非表示になる', () => {
      const { container } = renderComponent()

      const desktopMenu = container.querySelector('div.hidden.sm\\:flex')
      expect(desktopMenu).toHaveClass('hidden')
    })
  })

  describe('モバイルメニュー', () => {
    it('モバイルメニューが表示される', () => {
      const { container } = renderComponent()

      const mobileMenu = container.querySelector('div.sm\\:hidden')
      expect(mobileMenu).toBeInTheDocument()
    })

    it('モバイルメニューが正しいクラス名を持つ', () => {
      const { container } = renderComponent()

      const mobileMenu = container.querySelector('div.sm\\:hidden')
      expect(mobileMenu).toHaveClass('sticky')
      expect(mobileMenu).toHaveClass('top-0')
      expect(mobileMenu).toHaveClass('z-10')
      expect(mobileMenu).toHaveClass('backdrop-blur-xl')
    })
  })

  describe('Suspense フォールバック', () => {
    it('ナビゲーションメニューのコンテナを表示する', () => {
      const { container } = renderComponent()

      const ulElement = container.querySelector('ul')
      expect(ulElement).toBeInTheDocument()
    })
  })

  describe('ロゴリンク', () => {
    it('ロゴが正しいhrefを持つ', () => {
      const { container } = renderComponent()

      const logoLink = container.querySelector('a[href="/"]')
      expect(logoLink).toBeInTheDocument()
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('ロゴが正しいクラス名を持つ', () => {
      const { container } = renderComponent()

      const logoDiv = container.querySelector('div.text-2xl')
      expect(logoDiv).toHaveClass('text-2xl')
      expect(logoDiv).toHaveClass('font-bold')
    })
  })

  describe('レスポンシブ対応', () => {
    it('ヘッダーが sm サイズで sticky になる', () => {
      const { container } = renderComponent()

      const header = container.querySelector('header')
      expect(header).toHaveClass('sm:sticky')
      expect(header).toHaveClass('sm:top-0')
      expect(header).toHaveClass('sm:z-10')
    })

    it('モバイルメニューが sm サイズで非表示になる', () => {
      const { container } = renderComponent()

      const mobileMenu = container.querySelector('div.sm\\:hidden')
      expect(mobileMenu).toHaveClass('sm:hidden')
    })

    it('デスクトップメニューが sm サイズで表示される', () => {
      const { container } = renderComponent()

      const desktopMenu = container.querySelector('div.hidden.sm\\:flex')
      expect(desktopMenu).toHaveClass('sm:flex')
    })
  })
})
