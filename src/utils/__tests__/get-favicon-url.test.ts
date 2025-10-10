import { describe, it, expect } from 'vitest'

import getFaviconUrl from '../get-favicon-url'

describe('getFaviconUrl', () => {
  it('ドメイン "example.com" から正しい favicon URL を生成する', () => {
    const domain = 'example.com'
    const expected =
      'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://example.com&size=16'
    expect(getFaviconUrl(domain)).toBe(expected)
  })

  it('サブドメインを含むドメイン "sub.domain.co.jp" の場合', () => {
    const domain = 'sub.domain.co.jp'
    const expected =
      'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://sub.domain.co.jp&size=16'
    expect(getFaviconUrl(domain)).toBe(expected)
  })

  it('末尾にスラッシュがあるドメイン "example.com/" を渡した場合、そのまま URL に含まれる', () => {
    const domain = 'example.com/'
    const expected =
      'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://example.com/&size=16'
    expect(getFaviconUrl(domain)).toBe(expected)
  })

  it('空文字列を渡した場合も文字列が返ること（異常値に対する挙動確認）', () => {
    const domain = ''
    const result = getFaviconUrl(domain)
    expect(typeof result).toBe('string')
    expect(result).toContain('url=https://')
  })
})
