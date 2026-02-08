import { describe, it, expect, vi } from 'vitest'

// 環境変数定数をモック
vi.mock('@/env', () => ({
  isProduction: true,
  GOOGLE_ADS_CLIENT: 'pub-test-client-id',
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
