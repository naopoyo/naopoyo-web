import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import { Suspense } from 'react'

import { Avater } from '@/components/avatar'
import { DocumentList, DocumentListSkeleton } from '@/components/document'
import { Link } from '@/components/link'
import { Paragraph as P } from '@/components/paragraph'
import {
  SITE_DESC,
  SITE_NAME,
  PICKUP_DOCS_COUNT,
  RECENT_DOCS_COUNT,
  PICKUP_DOC_SLUGS,
} from '@/constants'
import { client } from '@/lib/hackersheet'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESC,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function HomePage() {
  return (
    <main className="container flex flex-col gap-10">
      <ProfileSection />
      <section>
        <h2 className="my-4 text-center text-xl font-bold">おすすめの記事</h2>
        <Suspense fallback={<DocumentListSkeleton length={PICKUP_DOCS_COUNT} />}>
          <PickupDocumentList />
        </Suspense>
      </section>
      <section>
        <h2 className="my-4 text-center text-xl font-bold">最近書いた記事</h2>
        <Suspense fallback={<DocumentListSkeleton length={RECENT_DOCS_COUNT} />}>
          <RecentDocumentList />
        </Suspense>
        <Link href="/docs" className="my-20 flex items-center justify-center gap-1">
          <span>すべての記事を見る</span>
          <ArrowRight />
        </Link>
      </section>
    </main>
  )
}

function ProfileSection() {
  return (
    <section className="mx-auto flex max-w-sm items-start justify-center gap-4 py-10">
      <Avater size="base" />
      <div className="text-sm text-muted-foreground">
        <h1 className="text-lg font-bold text-foreground">naopoyo</h1>
        <P>{SITE_DESC}</P>
        <P>
          <Link href="/about" className="flex items-center gap-1">
            <span>プロフィールをもっと見る</span>
            <ArrowRight />
          </Link>
        </P>
      </div>
    </section>
  )
}

async function PickupDocumentList() {
  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, slugs: PICKUP_DOC_SLUGS },
    sort: { by: 'published_at', order: 'desc' },
    first: PICKUP_DOCS_COUNT,
  })

  if (totalCount === 0)
    return <p className="text-center text-muted-foreground">おすすめの記事はありません。</p>

  return <DocumentList documents={documents} />
}

async function RecentDocumentList() {
  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, excludeSlugs: PICKUP_DOC_SLUGS },
    sort: { by: 'published_at', order: 'desc' },
    first: RECENT_DOCS_COUNT,
  })

  if (totalCount === 0)
    return <p className="text-center text-muted-foreground">最近書いたの記事はありません。</p>

  return <DocumentList documents={documents} />
}
