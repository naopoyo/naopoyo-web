import { describe, it, expect } from 'vitest'

import createDateFormat from '../create-date-format'

describe('createDateFormat', () => {
  describe('基本動作', () => {
    it('デフォルト設定（Asia/Tokyo）で ISO 文字列をフォーマットする', () => {
      const fmt = createDateFormat()
      // 2020-01-01T00:00:00Z は Asia/Tokyo で 2020/01/01 09:00 になる
      expect(fmt('2020-01-01T00:00:00Z')).toBe('2020/01/01 09:00')
    })

    it('Date オブジェクトの ISO 文字列をフォーマットする', () => {
      const fmt = createDateFormat('yyyy/MM/dd', 'UTC')
      const d = new Date(Date.UTC(2021, 5, 10, 0, 0, 0))
      expect(fmt(d.toISOString())).toBe('2021/06/10')
    })
  })

  describe('カスタムフォーマット', () => {
    it('カスタムフォーマットとタイムゾーンを適用する', () => {
      const fmt = createDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", 'UTC')
      const out = fmt('2020-01-01T09:30:15Z')
      // date-fns-tz のバージョンにより UTC は 'Z' または '+00:00' でフォーマットされる
      expect(['2020-01-01T09:30:15+00:00', '2020-01-01T09:30:15Z']).toContain(out)
    })
  })

  describe('エラーハンドリング', () => {
    it('無効な日付文字列でエラーをスローする', () => {
      const fmt = createDateFormat()
      expect(() => fmt('not-a-date')).toThrow()
    })
  })
})
