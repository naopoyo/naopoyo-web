import { DocumentList } from '@/components/document'
import { PageHeader } from '@/components/page-header'
import { getDocuments } from '@/lib/hackersheet'

const title = 'Docs'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function HomePage() {
  const { documents } = await getDocuments({
    filter: { draft: false },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <main className="container">
      <PageHeader>{title}</PageHeader>
      <section className="pb-8">
        <DocumentList documents={documents} />
      </section>
    </main>
  )
}
