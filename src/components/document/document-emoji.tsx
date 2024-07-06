'use client'

import twemoji from '@twemoji/api'

export interface DocumentEmojiProps {
  emoji: string
}

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
