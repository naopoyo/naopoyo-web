'use client'

import twemoji from '@twemoji/api'
import { useMemo } from 'react'

/**
 * DocumentEmoji の Props
 *
 * emoji - 画像としてレンダリングする絵文字文字列
 */
export type DocumentEmojiProps = {
  /** 表示する絵文字文字列 */
  emoji: string
}

/**
 * DocumentEmoji コンポーネント - Twemoji を利用して絵文字を SVG として表示します。
 *
 * - 絵文字が不正な場合は空の文字列を alt にセットして画像表示を回避します。
 * - src の生成は memoize して不要な再計算を避けます。
 * - 表示サイズは design token の `size-18`（72px）を使用します。
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
