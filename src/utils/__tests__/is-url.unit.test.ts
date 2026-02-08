import { describe, it, expect } from 'vitest'

import isUrl from '../is-url'

describe('isUrl', () => {
  describe('正常系', () => {
    it.each([
      ['https://example.com', 'HTTPS URL'],
      ['http://example.com', 'HTTP URL'],
      ['https://sub.domain.co.jp/path?query=1#hash', 'パス・クエリ・ハッシュ付き URL'],
      ['ftp://files.example.com', 'FTP URL'],
      ['mailto:user@example.com', 'mailto URL'],
    ])('"%s" を有効な URL と判定する（%s）', (input) => {
      expect(isUrl(input)).toBe(true)
    })
  })

  describe('異常系', () => {
    it.each([
      ['not-a-url', '通常の文字列'],
      ['example.com', 'スキームなしのドメイン'],
      ['', '空文字列'],
      ['/path/to/page', '相対パス'],
      ['://missing-scheme', 'スキームが欠落した文字列'],
    ])('"%s" を無効な URL と判定する（%s）', (input) => {
      expect(isUrl(input)).toBe(false)
    })
  })
})
