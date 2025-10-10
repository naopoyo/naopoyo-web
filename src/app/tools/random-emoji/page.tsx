import { Metadata } from 'next'

import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'

import { RandomEmoji } from './_components'

const title = 'ランダム絵文字コピー'

export const metadata: Metadata = {
  title: title,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function RandomEmojiPage() {
  return (
    <Container>
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader>{title}</PageHeader>
      </div>
      <section className="pb-8">
        <RandomEmoji />
      </section>
    </Container>
  )
}
