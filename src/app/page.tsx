import { DocumentList, getDocuments } from '@/features/document'

export const revalidate = 60

export default async function Home() {
  const { documents } = await getDocuments({
    filter: { draft: false },
    sort: { by: 'modifyed_at', order: 'desc' },
  })

  return (
    <>
      <h1 className='py-16 text-4xl text-center font-bold'>Documents</h1>
      <section className='p-8'>
        <DocumentList documents={documents} />
      </section>
    </>
  )
}
