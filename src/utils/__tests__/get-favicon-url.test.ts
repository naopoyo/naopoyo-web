import { describe, it, expect } from 'vitest'

import getFaviconUrl from '../get-favicon-url'

const BASE_URL = 'https://t1.gstatic.com/faviconV2'
const FAVICON_PARAMS = 'client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL'
const DEFAULT_SIZE = '16'

function buildExpectedUrl(domain: string): string {
  return `${BASE_URL}?${FAVICON_PARAMS}&url=https://${domain}&size=${DEFAULT_SIZE}`
}

describe('getFaviconUrl', () => {
  describe('正常系', () => {
    it.each([
      ['example.com', '基本的なドメイン'],
      ['sub.domain.co.jp', 'サブドメインを含むドメイン'],
      ['example.com/', '末尾にスラッシュがあるドメイン'],
    ])('ドメイン "%s" から正しい favicon URL を生成する（%s）', (domain) => {
      expect(getFaviconUrl(domain)).toBe(buildExpectedUrl(domain))
    })
  })

  describe('エラーハンドリング', () => {
    it('空文字列を渡した場合も文字列が返ること', () => {
      const result = getFaviconUrl('')
      expect(typeof result).toBe('string')
      expect(result).toContain('url=https://')
    })
  })
})
