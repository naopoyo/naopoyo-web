import { Metadata } from 'next'

import { TagList, getTags } from '@/features/tag'

export const metadata: Metadata = {
  title: 'Tags',
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Tags() {
  const { tags } = await getTags({ sort: { by: 'document_count', order: 'desc' } })

  return (
    <>
      <h1 className='py-16 text-4xl text-center font-bold'>Tags</h1>
      <section className='p-8'>
        <TagList tags={tags} />
      </section>
    </>
  )
}
