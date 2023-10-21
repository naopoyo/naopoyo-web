import { DocumentList, getDocuments } from '@/features/document'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Home() {
  const { documents } = await getDocuments({
    filter: { draft: false },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <>
      <h1 className='py-16 text-center text-4xl font-bold'>Docs</h1>
      <section className='p-8'>
        <DocumentList documents={documents} />
      </section>
    </>
  )
}
