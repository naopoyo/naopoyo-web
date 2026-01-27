import { Metadata } from 'next'

import { Container, PageHeader } from '@/components/layout'
import { EnglishVocabulary } from '@/tools/english-vocabulary'

const title = '英単語クイズ'

export const metadata: Metadata = {
  title: title,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function EnglishVocabularyPage() {
  return (
    <Container className="flex flex-col items-center gap-16 pt-16">
      <PageHeader title={title} />
      <EnglishVocabulary />
    </Container>
  )
}
