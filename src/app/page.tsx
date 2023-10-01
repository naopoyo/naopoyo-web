import { DocumentList, getDocuments } from '@/features/document'

export default async function Home() {
  const { documents } = await getDocuments({ filter: { draft: false } })

  return (
    <section className='p-8'>
      <DocumentList documents={documents} />
    </section>
  )
}
