'use client'

const emojiRanges = [
  { start: 0x1f600, end: 0x1f64f },
  { start: 0x1f300, end: 0x1f5ff },
  { start: 0x1f680, end: 0x1f6ff },
]

export default function useMakeRandomEmoji() {
  return makeRandomEmoji
}

function isEmoji(value: string): boolean {
  const emojiRegex =
    /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/u
  return emojiRegex.test(value)
}

function getRandomRange(): { start: number; end: number } {
  const randomIndex = Math.floor(Math.random() * emojiRanges.length)
  return emojiRanges[randomIndex]
}

function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeRandomEmoji(): string {
  let emoji = ''

  do {
    const randomRange = getRandomRange()
    const randomCodePoint = getRandomValue(randomRange.start, randomRange.end)
    emoji = String.fromCodePoint(randomCodePoint)
  } while (!isEmoji(emoji))

  return emoji
}
