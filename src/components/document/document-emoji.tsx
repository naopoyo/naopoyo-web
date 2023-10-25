export interface DocumentEmojiProps {
  emoji: string
}

export default function DocumentEmoji({ emoji }: DocumentEmojiProps) {
  return <span style={{ fontFamily: "'Noto Color Emoji" }}>{emoji}</span>
}
