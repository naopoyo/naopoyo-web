import { describe, it, expect, beforeEach } from 'vitest'

import createDateFormat from '../create-date-format'

describe('createDateFormat', () => {
  describe('基本動作', () => {
    let fmt: ReturnType<typeof createDateFormat>

    beforeEach(() => {
      fmt = createDateFormat()
    })

    it('デフォルト設定（Asia/Tokyo）で ISO 文字列をフォーマットする', () => {
      // 2020-01-01T00:00:00Z は Asia/Tokyo で 2020/01/01 09:00 になる
      expect(fmt('2020-01-01T00:00:00Z')).toBe('2020/01/01 09:00')
    })

    it('Date オブジェクトの ISO 文字列をフォーマットする', () => {
      const fmt2 = createDateFormat('yyyy/MM/dd', 'UTC')
      const date = new Date(Date.UTC(2021, 5, 10, 0, 0, 0))
      expect(fmt2(date.toISOString())).toBe('2021/06/10')
    })

    it('無効な日付文字列でエラーをスローする', () => {
      expect(() => fmt('not-a-date')).toThrow()
    })
  })

  describe('複数フォーマットパターン', () => {
    const testCases = [
      {
        format: 'yyyy/MM/dd',
        timezone: 'UTC',
        input: '2020-06-15T12:30:45Z',
        expected: '2020/06/15',
        description: '日付のみ',
      },
      {
        format: 'HH:mm:ss',
        timezone: 'UTC',
        input: '2020-06-15T12:30:45Z',
        expected: '12:30:45',
        description: '時間のみ',
      },
      {
        format: "yyyy-MM-dd'T'HH:mm:ss",
        timezone: 'UTC',
        input: '2020-06-15T12:30:45Z',
        expected: '2020-06-15T12:30:45',
        description: 'ISO形式',
      },
    ]

    testCases.forEach(({ format, timezone, input, expected, description }) => {
      it(`${description}をフォーマットする`, () => {
        const fmt = createDateFormat(format, timezone)
        expect(fmt(input)).toBe(expected)
      })
    })
  })

  describe('タイムゾーン処理', () => {
    const timeZones = [
      {
        timezone: 'Asia/Tokyo',
        input: '2020-01-01T00:00:00Z',
        expected: '2020/01/01 09:00',
        description: 'Asia/Tokyo（UTC+9）',
      },
      {
        timezone: 'UTC',
        input: '2020-01-01T00:00:00Z',
        expected: '2020/01/01 00:00',
        description: 'UTC',
      },
      {
        timezone: 'America/New_York',
        input: '2020-01-01T00:00:00Z',
        expected: '2019/12/31 19:00',
        description: 'America/New_York（UTC-5 冬時間）',
      },
    ]

    timeZones.forEach(({ timezone, input, expected, description }) => {
      it(`${description}で正確にフォーマットする`, () => {
        const fmt = createDateFormat('yyyy/MM/dd HH:mm', timezone)
        expect(fmt(input)).toBe(expected)
      })
    })
  })

  describe('カスタムフォーマット', () => {
    it('タイムゾーンオフセット付きでフォーマットする', () => {
      const fmt = createDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", 'UTC')
      const result = fmt('2020-01-01T09:30:15Z')
      // date-fns-tz のバージョンにより UTC は 'Z' または '+00:00' でフォーマットされる
      expect(['2020-01-01T09:30:15+00:00', '2020-01-01T09:30:15Z']).toContain(result)
    })
  })

  describe('エラーハンドリング', () => {
    const fmt = createDateFormat()

    const invalidInputs = [
      { input: 'not-a-date', description: '不正な日付文字列' },
      { input: '', description: '空文字列' },
      { input: 'invalid', description: '無効な形式' },
    ]

    invalidInputs.forEach(({ input, description }) => {
      it(`${description}でエラーをスローする`, () => {
        expect(() => fmt(input)).toThrow()
      })
    })
  })
})
