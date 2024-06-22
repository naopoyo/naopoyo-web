'use client'

import Twemoji from 'react-twemoji'

export interface DocumentEmojiProps {
  emoji: string
}

export default function DocumentEmoji({ emoji }: DocumentEmojiProps) {
  return <Twemoji options={{ className: 'twemoji' }}>{emoji}</Twemoji>
}
