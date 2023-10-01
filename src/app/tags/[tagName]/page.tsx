import { notFound } from 'next/navigation'

import { DocumentList } from '@/features/document'
import getTag from '@/features/tag/functions/get-tag'

export default async function TagDetail({ params: { tagName } }: { params: { tagName: string } }) {
  const decodedTagName = decodeURI(tagName)
  const { tag } = await getTag({ name: decodedTagName })

  if (!tag || tag.documentCountInPublished === 0) {
    return notFound()
  }

  return (
    <>
      <h1 className='py-16 text-4xl text-center font-bold'>{tag.name}</h1>
      <section className='p-8'>
        <DocumentList filter={{ tags: [tag.name], draft: false }} />
      </section>
    </>
  )
}
