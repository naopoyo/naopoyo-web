import { describe, it, expect, vi, afterEach } from 'vitest'

import timeAgo from '../time-ago'

describe('timeAgo', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('相対時間の表示', () => {
    it.each([
      [30 * 1000, '1分前'],
      [5 * 60 * 1000, '5分前'],
      [2 * 60 * 60 * 1000, '約2時間前'],
      [1 * 24 * 60 * 60 * 1000, '1日前'],
      [30 * 24 * 60 * 60 * 1000, '約1か月前'],
    ])('%i ミリ秒前の日時に対して "%s" を返す', (msAgo, expected) => {
      const now = new Date('2025-01-15T12:00:00Z')
      vi.setSystemTime(now)

      const past = new Date(now.getTime() - msAgo).toISOString()
      expect(timeAgo(past)).toBe(expected)
    })
  })

  describe('エッジケース', () => {
    it('ISO 文字列を正しくパースする', () => {
      const now = new Date('2025-06-01T00:00:00Z')
      vi.setSystemTime(now)

      const result = timeAgo('2025-05-31T23:00:00Z')
      expect(result).toBe('約1時間前')
    })

    it('無効な日付文字列でエラーをスローする', () => {
      expect(() => timeAgo('invalid-date')).toThrow()
    })
  })
})
