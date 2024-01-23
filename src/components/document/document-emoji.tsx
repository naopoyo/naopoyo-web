export interface DocumentEmojiProps {
  emoji: string
}

export default function DocumentEmoji({ emoji }: DocumentEmojiProps) {
  return <span className="font-noto-color-emoji">{emoji}</span>
}
