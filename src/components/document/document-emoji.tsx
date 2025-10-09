'use client'

import twemoji from '@twemoji/api'

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
 * @param props - DocumentEmojiProps
 * @returns 絵文字を表す JSX 要素
 */
export default function DocumentEmoji({ emoji }: DocumentEmojiProps) {
  const src = ''.concat(
    twemoji.base,
    'svg',
    '/',
    twemoji.convert.toCodePoint(emoji).replace(/-.*/, ''),
    '.svg'
  )

  return (
    <picture>
      <img src={src} alt={emoji} width={72} height={72} />
    </picture>
  )
}
