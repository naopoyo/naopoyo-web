import { Metadata } from 'next'

import { RandomEmoji } from '@/components/tools/random-emoji'

export const metadata: Metadata = {
  title: 'ランダム絵文字コピー',
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function RandomEmojiPage() {
  return (
    <>
      <h1 className="py-16 text-center text-4xl font-bold">ランダム絵文字コピー</h1>
      <RandomEmoji />
    </>
  )
}
