'use cache'

import { Metadata } from 'next'

import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'
import { FullProfile } from '@/components/site'

const title = 'About'
const description = 'naopoyo.comについて説明しているページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export default function AboutPage() {
  return (
    <Container className="flex flex-col gap-8 pt-16">
      <PageHeader title={title} description={description} />
      <FullProfile />
    </Container>
  )
}
