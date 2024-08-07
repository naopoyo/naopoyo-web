import { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { TagList } from '@/components/tag'
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
    <div className="container">
      <div className="my-16 flex flex-col items-center gap-4">
        <PageHeader>{title}</PageHeader>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <section className="mx-auto mb-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="text-muted-foreground">全 {totalCount} 件</div>
      </section>
      <section className="pb-8">
        <TagList tags={tags} />
      </section>
    </div>
  )
}
