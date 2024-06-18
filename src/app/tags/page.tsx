import { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { TagList } from '@/components/tag'
import { client } from '@/lib/hackersheet'

const title = 'Tags'

export const metadata: Metadata = {
  title: title,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function TagsPage() {
  const { tags, totalCount } = await client.getTags({
    sort: { by: 'document_count_in_published', order: 'desc' },
  })

  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>
      <section className="mx-auto mb-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="text-muted-foreground">全 {totalCount} 件</div>
      </section>
      <section className="pb-8">
        <TagList tags={tags} />
      </section>
    </div>
  )
}
