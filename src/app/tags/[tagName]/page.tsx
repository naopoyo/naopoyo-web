import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DocumentList, getDocuments } from '@/features/document'
import getTag from '@/features/tag/functions/get-tag'

interface TagDetailProps {
  params: { tagName: string }
}

export async function generateMetadata({ params: { tagName } }: TagDetailProps): Promise<Metadata> {
  const decodedTagName = decodeURI(tagName)
  const { tag } = await getTag({ name: decodedTagName })

  if (!tag) return {}

  return {
    title: `${tag.name} - Tags`,
  }
}

export default async function TagDetail({ params: { tagName } }: TagDetailProps) {
  const decodedTagName = decodeURI(tagName)
  const { tag } = await getTag({ name: decodedTagName })

  if (!tag || tag.documentCountInPublished === 0) {
    return notFound()
  }

  const { documents } = await getDocuments({ filter: { tags: [tag.name], draft: false } })

  return (
    <>
      <h1 className='py-16 text-4xl text-center font-bold'>{tag.name}</h1>
      <section className='p-8'>
        <DocumentList documents={documents} />
      </section>
    </>
  )
}
