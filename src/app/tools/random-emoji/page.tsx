import { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { RandomEmoji } from '@/components/tools/random-emoji'

const title = 'ランダム絵文字コピー'

export const metadata: Metadata = {
  title: title,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function RandomEmojiPage() {
  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>
      <section className="pb-8">
        <RandomEmoji />
      </section>
    </div>
  )
}
