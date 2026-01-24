'use client'

import twemoji from '@twemoji/api'
import { useMemo } from 'react'

/**
 * DocumentEmoji コンポーネントの Props
 *
 * @property {string} emoji - 表示する絵文字文字列
 */
export type DocumentEmojiProps = {
  /** 表示する絵文字文字列 */
  emoji: string
}

/**
 * DocumentEmoji コンポーネント - Twemoji を利用して絵文字を SVG として表示します
 *
 * Unicode 絵文字文字列を受け取り、Twemoji ライブラリを使用して対応する SVG 画像に変換・表示します。
 *
 * - 絵文字が不正な場合は空のスペーサーを表示して画像表示を回避
 * - src の生成は useMemo でメモ化して不要な再計算を避ける
 * - 表示サイズは 72px × 72px（design token の `size-18`）を使用
 *
 * @param props - DocumentEmojiProps
 * @returns 絵文字を表す JSX 要素
 */
export default function DocumentEmoji({ emoji }: DocumentEmojiProps) {
  const src = useMemo(() => {
    if (!emoji || typeof emoji !== 'string') return ''

    try {
      const code = twemoji.convert.toCodePoint(emoji).replace(/-.*/, '')
      return ''.concat(twemoji.base, 'svg', '/', code, '.svg')
    } catch {
      return ''
    }
  }, [emoji])

  if (!src) {
    return <span aria-hidden="true" className="inline-block size-18" />
  }

  return (
    <picture>
      <img src={src} alt={emoji} width={72} height={72} />
    </picture>
  )
}
