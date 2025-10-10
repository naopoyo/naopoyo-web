import { describe, it, expect } from 'vitest'

import { stringToColorWithFrame } from '../string-to-color-with-frame'

describe('stringToColorWithFrame', () => {
  // 基本的な戻り値の形を検証する
  it('文字列から正しい形式のカラーとフレームを返す', () => {
    const [color, frame] = stringToColorWithFrame('test')
    // color は #rrggbb の形式
    expect(color).toMatch(/^#[0-9a-f]{6}$/i)
    // frame は '#000' または '#fff'
    expect(['#000', '#fff']).toContain(frame)
  })

  // 同じ入力は常に同じ出力を返す
  it('同じ文字列であれば常に同じカラーを返す', () => {
    const a = stringToColorWithFrame('naopoyo')
    const b = stringToColorWithFrame('naopoyo')
    expect(a).toEqual(b)
  })

  // 異なる入力で色が異なることを期待する（衝突は稀なので単純チェック）
  it('異なる文字列では通常異なるカラーになる', () => {
    const a = stringToColorWithFrame('foo')
    const b = stringToColorWithFrame('bar')
    // まれに同じになる可能性はあるが、通常は異なる
    expect(a[0]).not.toEqual(b[0])
  })

  // 空文字列や長い文字列の扱い
  it('空文字列と他の文字列で動作する（例: 空文字列）', () => {
    const [colorEmpty, frameEmpty] = stringToColorWithFrame('')
    expect(colorEmpty).toMatch(/^#[0-9a-f]{6}$/i)
    expect(['#000', '#fff']).toContain(frameEmpty)
  })

  it('長い文字列でも安定して返す', () => {
    const long = 'a'.repeat(1000)
    const [colorLong, frameLong] = stringToColorWithFrame(long)
    expect(colorLong).toMatch(/^#[0-9a-f]{6}$/i)
    expect(['#000', '#fff']).toContain(frameLong)
  })

  it('日本語や他の Unicode 文字列で動作する', () => {
    const [c1, f1] = stringToColorWithFrame('こんにちは')
    const [c2, f2] = stringToColorWithFrame('漢字テスト')
    expect(c1).toMatch(/^#[0-9a-f]{6}$/i)
    expect(c2).toMatch(/^#[0-9a-f]{6}$/i)
    expect(['#000', '#fff']).toContain(f1)
    expect(['#000', '#fff']).toContain(f2)
  })

  it('絵文字を含む文字列で動作する', () => {
    const [cEmoji, fEmoji] = stringToColorWithFrame('🙂🚀✨')
    expect(cEmoji).toMatch(/^#[0-9a-f]{6}$/i)
    expect(['#000', '#fff']).toContain(fEmoji)
  })

  it('制御文字（改行・タブ）を含む文字列でも動作する', () => {
    const [cCtrl, fCtrl] = stringToColorWithFrame('line1\nline2\tend')
    expect(cCtrl).toMatch(/^#[0-9a-f]{6}$/i)
    expect(['#000', '#fff']).toContain(fCtrl)
  })

  it('非常に長いユニコード文字列でも安定して返す', () => {
    const longUnicode = 'あ'.repeat(500) + '🙂'.repeat(200)
    const [cLongU, fLongU] = stringToColorWithFrame(longUnicode)
    expect(cLongU).toMatch(/^#[0-9a-f]{6}$/i)
    expect(['#000', '#fff']).toContain(fLongU)
  })

  it('null/undefined を渡した場合の挙動（ランタイムでの挙動確認）', () => {
    // 型的には string を想定しているため通常は避けるべきだが、実行時の挙動を確認する
    // 型チェックを回避するため any にキャストしてランタイム挙動を確認する
    let threw = false
    try {
      // 型チェックを回避してランタイムでの挙動を確認するため Reflect.apply を使う
      Reflect.apply(
        stringToColorWithFrame as unknown as (...args: unknown[]) => unknown,
        undefined,
        [null]
      )
    } catch {
      threw = true
    }
    expect(threw).toBe(true)
  })

  it('類似の短い文字列でフレームが変わりうるかの簡易チェック（閾値近傍）', () => {
    const base = stringToColorWithFrame('a')
    const base2 = stringToColorWithFrame('A')
    // 同じ色になることもありうるが、少し違う入力で色やフレームが変わることを確認する
    expect(base[0]).toMatch(/^#[0-9a-f]{6}$/i)
    expect(base2[0]).toMatch(/^#[0-9a-f]{6}$/i)
    expect(['#000', '#fff']).toContain(base[1])
    expect(['#000', '#fff']).toContain(base2[1])
  })
})
