import { describe, it, expect } from 'vitest'

import { stringToColorWithFrame } from '../string-to-color-with-frame'

const COLOR_PATTERN = /^#[0-9a-f]{6}$/i
const VALID_FRAMES = ['#000', '#fff'] as const

/**
 * カラーとフレームが有効な形式であることを検証するヘルパー関数
 */
function expectValidColorAndFrame(result: [string, string]): void {
  const [color, frame] = result
  expect(color).toMatch(COLOR_PATTERN)
  expect(VALID_FRAMES).toContain(frame)
}

describe('stringToColorWithFrame', () => {
  describe('基本動作', () => {
    it('文字列から正しい形式のカラーとフレームを返す', () => {
      const result = stringToColorWithFrame('test')
      expectValidColorAndFrame(result)
    })

    it('同じ文字列であれば常に同じ結果を返す', () => {
      const input = 'naopoyo'
      const result1 = stringToColorWithFrame(input)
      const result2 = stringToColorWithFrame(input)

      expect(result1).toEqual(result2)
    })

    it('異なる文字列では通常異なるカラーになる', () => {
      const [colorFoo] = stringToColorWithFrame('foo')
      const [colorBar] = stringToColorWithFrame('bar')

      expect(colorFoo).not.toEqual(colorBar)
    })
  })

  describe('様々な入力文字列', () => {
    it.each([
      ['空文字列', ''],
      ['日本語（ひらがな）', 'こんにちは'],
      ['日本語（漢字）', '漢字テスト'],
      ['絵文字', '🙂🚀✨'],
      ['制御文字', 'line1\nline2\tend'],
      ['短い文字列', 'a'],
      ['大文字', 'A'],
    ])('%s で正しい形式を返す', (_, input) => {
      const result = stringToColorWithFrame(input)
      expectValidColorAndFrame(result)
    })

    it.each([
      ['長い ASCII 文字列', 'a'.repeat(1000)],
      ['長いユニコード文字列', 'あ'.repeat(500) + '🙂'.repeat(200)],
    ])('%s でも安定して返す', (_, input) => {
      const result = stringToColorWithFrame(input)
      expectValidColorAndFrame(result)
    })
  })

  describe('エラーハンドリング', () => {
    it('null を渡すとエラーをスローする', () => {
      expect(() => {
        ;(stringToColorWithFrame as (s: unknown) => unknown)(null)
      }).toThrow()
    })
  })
})
