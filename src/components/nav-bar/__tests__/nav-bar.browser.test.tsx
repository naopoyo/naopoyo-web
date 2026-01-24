import { render, cleanup } from '@testing-library/react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

interface MockLinkProps extends PropsWithChildren {
  href: string
  className?: string
}

// 環境変数をモック化
vi.mock('@/constants', () => ({
  SITE_NAME: 'naopoyo.com',
}))

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
      const { container } = render(<NavBar />)

      const header = container.querySelector('header')
      const mobileMenuWrapper = container.querySelector('div.sticky')

      expect(header).toBeTruthy()
      expect(mobileMenuWrapper).toBeTruthy()
    })

    it('ロゴが「naopoyo.com」を表示する', () => {
      const { container } = render(<NavBar />)

      const logoLink = container.querySelector('a[href="/"]')
      expect(logoLink?.textContent).toBe('naopoyo.com')
    })

    it('ヘッダーが正しいクラス名を持つ', () => {
      const { container } = render(<NavBar />)

      const header = container.querySelector('header')
      expect(header?.className).toContain('container')
      expect(header?.className).toContain('mx-auto')
      expect(header?.className).toContain('flex')
      expect(header?.className).toContain('h-16')
      expect(header?.className).toContain('backdrop-blur-xl')
    })
  })

  describe('デスクトップメニュー', () => {
    it('デスクトップメニューが表示される', () => {
      const { container } = render(<NavBar />)

      const desktopMenu = container.querySelector('div.hidden.sm\\:flex')
      expect(desktopMenu).toBeTruthy()
    })

    it('モバイル表示では非表示になる', () => {
      const { container } = render(<NavBar />)

      const desktopMenu = container.querySelector('div.hidden.sm\\:flex')
      expect(desktopMenu?.className).toContain('hidden')
    })
  })

  describe('モバイルメニュー', () => {
    it('モバイルメニューが表示される', () => {
      const { container } = render(<NavBar />)

      const mobileMenu = container.querySelector('div.sm\\:hidden')
      expect(mobileMenu).toBeTruthy()
    })

    it('モバイルメニューが正しいクラス名を持つ', () => {
      const { container } = render(<NavBar />)

      const mobileMenu = container.querySelector('div.sm\\:hidden')
      expect(mobileMenu?.className).toContain('sticky')
      expect(mobileMenu?.className).toContain('top-0')
      expect(mobileMenu?.className).toContain('z-10')
      expect(mobileMenu?.className).toContain('backdrop-blur-xl')
    })
  })

  describe('Suspense フォールバック', () => {
    it('ナビゲーションメニューのコンテナを表示する', () => {
      const { container } = render(<NavBar />)

      const ulElement = container.querySelector('ul')
      expect(ulElement).toBeTruthy()
    })
  })

  describe('ロゴリンク', () => {
    it('ロゴが正しいhrefを持つ', () => {
      const { container } = render(<NavBar />)

      const logoLink = container.querySelector('a[href="/"]') as HTMLAnchorElement
      expect(logoLink).toBeTruthy()
      expect(logoLink.href).toContain('/')
    })

    it('ロゴが正しいクラス名を持つ', () => {
      const { container } = render(<NavBar />)

      const logoDiv = container.querySelector('div.text-2xl')
      expect(logoDiv?.className).toContain('text-2xl')
      expect(logoDiv?.className).toContain('font-bold')
    })
  })

  describe('レスポンシブ対応', () => {
    it('ヘッダーが sm サイズで sticky になる', () => {
      const { container } = render(<NavBar />)

      const header = container.querySelector('header')
      expect(header?.className).toContain('sm:sticky')
      expect(header?.className).toContain('sm:top-0')
      expect(header?.className).toContain('sm:z-10')
    })

    it('モバイルメニューが sm サイズで非表示になる', () => {
      const { container } = render(<NavBar />)

      const mobileMenu = container.querySelector('div.sm\\:hidden')
      expect(mobileMenu?.className).toContain('sm:hidden')
    })

    it('デスクトップメニューが sm サイズで表示される', () => {
      const { container } = render(<NavBar />)

      const desktopMenu = container.querySelector('div.hidden.sm\\:flex')
      expect(desktopMenu?.className).toContain('sm:flex')
    })
  })
})
