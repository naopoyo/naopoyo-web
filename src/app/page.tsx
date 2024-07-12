import { Metadata } from 'next'
import { PropsWithChildren, Suspense } from 'react'

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
        <Heading>おすすめの記事</Heading>
        <Suspense fallback={<DocumentListSkeleton length={PICKUP_DOCS_COUNT} />}>
          <PickupDocumentList />
        </Suspense>
      </section>
      <section>
        <Heading>最近書いた記事</Heading>
        <Suspense fallback={<DocumentListSkeleton length={RECENT_DOCS_COUNT} />}>
          <RecentDocumentList />
        </Suspense>
        <div className="my-8 text-center">
          <Link href="/docs" icon="arrow">
            すべての記事を見る
          </Link>
        </div>
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
          <Link href="/about" icon="arrow">
            プロフィールをもっと見る
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

  if (totalCount === 0) return <NotFoundMessage>おすすめの記事はありません。</NotFoundMessage>

  return <DocumentList documents={documents} />
}

async function RecentDocumentList() {
  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, excludeSlugs: PICKUP_DOC_SLUGS },
    sort: { by: 'published_at', order: 'desc' },
    first: RECENT_DOCS_COUNT,
  })

  if (totalCount === 0) return <NotFoundMessage>最近書いた記事はありません。</NotFoundMessage>

  return <DocumentList documents={documents} />
}

function NotFoundMessage({ children }: PropsWithChildren) {
  return <p className="text-center text-muted-foreground">{children}</p>
}

function Heading({ children }: PropsWithChildren) {
  return <h2 className="my-4 text-center text-xl font-bold">{children}</h2>
}
