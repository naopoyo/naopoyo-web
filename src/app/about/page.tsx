import { Metadata } from 'next'

import { Container } from '@/components/layouts/containers'
import { PageHeader } from '@/components/layouts/page-headers'
import { FullProfile } from '@/components/site'


const title = 'About'
const description = 'naopoyo.comについて説明しているページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

/**
 * About ページ - サイトとプロフィールの紹介ページ
 *
 * @returns About ページの JSX
 */
export default async function AboutPage() {
  return (
    <Container className="flex flex-col items-center gap-12 pt-16">
      <PageHeader title={title} description={description} />
      <main className="w-full max-w-2xl">
        <FullProfile />
      </main>
    </Container>
  )
}
