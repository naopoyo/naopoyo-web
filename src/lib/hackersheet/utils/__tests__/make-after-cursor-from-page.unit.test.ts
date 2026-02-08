import { describe, it, expect } from 'vitest'

import makeAfterCursorFromPage from '../make-after-cursor-from-page'

describe('makeAfterCursorFromPage', () => {
  describe('基本動作', () => {
    it('1ページ目の場合は undefined を返す', () => {
      const result = makeAfterCursorFromPage(1, 20)
      expect(result).toBeUndefined()
    })

    it('2ページ目以降の場合はBase64エンコードされたカーソルを返す', () => {
      const result = makeAfterCursorFromPage(2, 20)
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
      // ページ2のオフセットは 20、Base64で "MjA=" になる
      expect(result).toBe('MjA=')
    })

    it('異なるページサイズで正しいオフセットを計算する', () => {
      const result = makeAfterCursorFromPage(3, 50)
      // ページ3のオフセットは (3-1) * 50 = 100、Base64で "MTAw" になる
      expect(result).toBe('MTAw')
    })
  })

  describe('エッジケース', () => {
    it('ページサイズが1の場合', () => {
      const result = makeAfterCursorFromPage(2, 1)
      expect(result).toBeDefined()
      expect(result).toBe('MQ==') // "1" の Base64
    })

    it('ページサイズが大きい場合', () => {
      const result = makeAfterCursorFromPage(2, 1000)
      expect(result).toBeDefined()
      expect(result).toBe('MTAwMA==') // "1000" の Base64
    })

    it('高いページ番号での計算', () => {
      const result = makeAfterCursorFromPage(100, 20)
      expect(result).toBeDefined()
      // ページ100のオフセットは (100-1) * 20 = 1980
      expect(result).toBe('MTk4MA==')
    })
  })
})
