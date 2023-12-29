import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DocumentList } from '@/components/document'
import { getDocuments, getTag } from '@/lib/hackersheet'

interface TagPageProps {
  params: { tagName: string }
}

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata({ params: { tagName } }: TagPageProps): Promise<Metadata> {
  const decodedTagName = decodeURI(tagName)
  const { tag } = await getTag({ name: decodedTagName })

  if (!tag) return {}

  return {
    title: `${tag.name} - Tags`,
  }
}

export default async function TagPage({ params: { tagName } }: TagPageProps) {
  const decodedTagName = decodeURI(tagName)
  const { tag } = await getTag({ name: decodedTagName })

  if (!tag || tag.documentCountInPublished === 0) {
    return notFound()
  }

  const { documents } = await getDocuments({
    filter: { tags: [tag.name], draft: false },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <>
      <h1 className="py-16 text-center text-4xl font-bold">{tag.name}</h1>
      <section className="p-8">
        <DocumentList documents={documents} />
      </section>
    </>
  )
}
