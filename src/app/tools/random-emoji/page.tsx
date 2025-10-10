import { Metadata } from 'next'

import { Container, PageHeader } from '@/components/layout'

import { RandomEmoji } from './_components'

const title = 'ランダム絵文字コピー'

export const metadata: Metadata = {
  title: title,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function RandomEmojiPage() {
  return (
    <Container className="flex flex-col items-center gap-16 pt-16">
      <PageHeader title={title} />
      <RandomEmoji />
    </Container>
  )
}
