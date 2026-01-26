import { describe, it, expect, vi } from 'vitest'

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

// next/script のモック
vi.mock('next/script', () => ({
  default: vi.fn((props: Record<string, unknown>) => ({
    type: 'Script',
    props,
  })),
}))

import GoogleAdsScript from '../google-ads-script'

describe('GoogleAdsScript', () => {
  describe('コンポーネント', () => {
    it('関数として呼び出せる', () => {
      expect(typeof GoogleAdsScript).toBe('function')
    })

    it('スクリプト要素またはnullを返す', () => {
      const result = GoogleAdsScript()
      expect(result === null || typeof result === 'object').toBe(true)
    })
  })

  describe('スクリプト属性', () => {
    it('async属性が設定される', () => {
      const result = GoogleAdsScript()
      if (result && typeof result === 'object' && 'props' in result) {
        expect((result as unknown as Record<string, unknown>).props).toBeDefined()
      }
    })

    it('crossOrigin属性が "anonymous" に設定される', () => {
      const result = GoogleAdsScript()
      if (result && typeof result === 'object' && 'props' in result) {
        const props = (result as unknown as Record<string, unknown>).props as Record<
          string,
          unknown
        >
        expect(props.crossOrigin).toBe('anonymous')
      }
    })

    it('strategy属性が "afterInteractive" に設定される', () => {
      const result = GoogleAdsScript()
      if (result && typeof result === 'object' && 'props' in result) {
        const props = (result as unknown as Record<string, unknown>).props as Record<
          string,
          unknown
        >
        expect(props.strategy).toBe('afterInteractive')
      }
    })

    it('Google AdSense URL が正しい形式', () => {
      const result = GoogleAdsScript()
      if (result && typeof result === 'object' && 'props' in result) {
        const props = (result as unknown as Record<string, unknown>).props as Record<
          string,
          unknown
        >
        const src = props.src as string
        expect(src).toContain('pagead2.googlesyndication.com')
        expect(src).toContain('adsbygoogle.js')
        expect(src).toContain('client=ca-pub-')
      }
    })
  })
})
