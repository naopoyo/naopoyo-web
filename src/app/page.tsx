import { Metadata } from 'next'
import { Suspense } from 'react'

import { DocumentList } from '@/components/document'
import { PageHeader } from '@/components/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import { siteDesc, siteName } from '@/constants'
import { client } from '@/lib/hackersheet'

const title = 'Docs'

export const metadata: Metadata = {
  title: siteName,
  description: siteDesc,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function HomePage() {
  return (
    <main className="container">
      <PageHeader>{title}</PageHeader>
      <Suspense fallback={<DocumentListSectionSkeleton />}>
        <DocumentListSection />
      </Suspense>
    </main>
  )
}

async function DocumentListSection() {
  const { documents } = await client.getDocuments({
    filter: { draft: false },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <section>
      <DocumentList documents={documents} />
    </section>
  )
}

function DocumentListSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={`skeleton-item-${index}`} className="h-[300px]" />
      ))}
    </div>
  )
}
