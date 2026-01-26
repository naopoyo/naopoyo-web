import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

// 定数をモック
vi.mock('@/constants', () => ({
  isProduction: true,
  GOOGLE_ADS_CLIENT: 'pub-test-client-id',
  BASE_URL: 'http://localhost:3000',
  GTM_ID: '',
  GOOGLE_ADS_SLOT_BANNER: '',
  SITE_NAME: 'test',
  SITE_DESC: 'test',
  RECENT_DOCS_COUNT: 6,
  HACKERSHEET_API_ENDPOINT: '',
  HACKERSHEET_API_ACCESS_KEY: '',
  HACKERSHEET_GITHUB_REPO_FULL_NAME: '',
  HACKERSHEET_GITHUB_REPO_URL: '',
  TOCBOT_BASE_OPTIONS: {},
}))

// next/navigation をモック
vi.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}))

import GoogleAds from '../google-ads'

describe('GoogleAds', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Window.adsbygoogle をリセット
    delete (window as Record<string, unknown>).adsbygoogle
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('レンダリング', () => {
    it('本番環境でマウント後に広告要素を表示する', () => {
      const { container } = render(<GoogleAds slot="1234567890" format="auto" responsive="true" />)

      const insElement = container.querySelector('ins.adsbygoogle')
      expect(insElement).toBeTruthy()
    })

    it('広告スロットと形式の属性が正しく設定される', () => {
      const { container } = render(
        <GoogleAds slot="9876543210" format="rectangle" responsive="false" />
      )

      const insElement = container.querySelector('ins.adsbygoogle')
      expect(insElement?.getAttribute('data-ad-slot')).toBe('9876543210')
      expect(insElement?.getAttribute('data-ad-format')).toBe('rectangle')
    })

    it('クライアント ID が正しく設定される', () => {
      const { container } = render(<GoogleAds slot="1234567890" format="auto" responsive="true" />)

      const insElement = container.querySelector('ins.adsbygoogle')
      expect(insElement?.getAttribute('data-ad-client')).toBe('ca-pub-pub-test-client-id')
    })

    it('レスポンシブ属性がデフォルト値で設定される', () => {
      const { container } = render(<GoogleAds slot="1234567890" />)

      const insElement = container.querySelector('ins.adsbygoogle')
      expect(insElement?.getAttribute('data-full-width-responsive')).toBe('true')
    })

    it('フォーマット属性がデフォルト値で設定される', () => {
      const { container } = render(<GoogleAds slot="1234567890" />)

      const insElement = container.querySelector('ins.adsbygoogle')
      expect(insElement?.getAttribute('data-ad-format')).toBe('auto')
    })
  })

  describe('div要素', () => {
    it('ins要素を内包するdiv要素を持つ', () => {
      const { container } = render(<GoogleAds slot="1234567890" format="auto" responsive="true" />)

      const divElement = container.firstChild as Element | null
      expect(divElement?.nodeName).toBe('DIV')

      const insElement = divElement?.querySelector('ins.adsbygoogle')
      expect(insElement).toBeTruthy()
    })

    it('div要素に一意のキーが設定される', () => {
      const { container, rerender } = render(
        <GoogleAds slot="slot-1" format="auto" responsive="true" />
      )

      const firstDiv = container.firstChild as Element | null
      expect(firstDiv).toBeTruthy()

      // パスが変わると新しいdivが生成される
      rerender(<GoogleAds slot="slot-2" format="auto" responsive="true" />)

      const secondDiv = container.firstChild as Element | null
      // キーが異なるため要素が再生成されることを確認
      expect(firstDiv).not.toBe(secondDiv)
    })
  })

  describe('スタイル', () => {
    it('ins要素にdisplay: block スタイルが適用される', () => {
      const { container } = render(<GoogleAds slot="1234567890" format="auto" responsive="true" />)

      const insElement = container.querySelector('ins.adsbygoogle')
      const style = (insElement as HTMLElement)?.style
      expect(style.display).toBe('block')
    })
  })
})
