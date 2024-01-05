import { Metadata } from 'next'

import { TagList } from '@/components/tag'
import { getTags } from '@/lib/hackersheet'

export const metadata: Metadata = {
  title: 'Tags',
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function TagsPage() {
  const { tags } = await getTags({ sort: { by: 'document_count_in_published', order: 'desc' } })

  return (
    <>
      <h1 className="py-16 text-center text-4xl font-bold">Tags</h1>
      <section className="p-8">
        <TagList tags={tags} />
      </section>
    </>
  )
}
