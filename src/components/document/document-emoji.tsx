'use client'

import Twemoji from 'react-twemoji'

export interface DocumentEmojiProps {
  emoji: string
}

export default function DocumentEmoji({ emoji }: DocumentEmojiProps) {
  return (
    <div className="size-[72px]">
      <Twemoji options={{ className: 'twemoji' }}>{emoji}</Twemoji>
    </div>
  )
}
