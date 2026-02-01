import { Metadata } from 'next'

import { MutedMessage } from '@/components/feedback/message'
import { Container } from '@/components/layouts/containers'
import { PageHeader } from '@/components/layouts/page-headers'
import { TagList } from '@/features/tag'
import { client } from '@/lib/hackersheet'

const title = 'Tags'
const description = 'naopoyo.comの記事につけられているタグの一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function TagsPage() {
  const { tags, totalCount } = await client.getTags({
    sort: { by: 'document_count_in_published', order: 'desc' },
  })

  return (
    <Container className="flex flex-col items-center gap-8 pt-16">
      <PageHeader title={title} description={description} />
      <MutedMessage>全 {totalCount} 件</MutedMessage>
      <TagList tags={tags} />
    </Container>
  )
}
