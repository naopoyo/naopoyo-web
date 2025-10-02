import { Metadata } from 'next'
import { PropsWithChildren, Suspense } from 'react'

import { Avater } from '@/components/avatar'
import { DocumentList, DocumentListSkeleton } from '@/components/document'
import { Link } from '@/components/link'
import { Paragraph as P } from '@/components/paragraph'
import { SITE_DESC, SITE_NAME, RECENT_DOCS_COUNT } from '@/constants'
import { client } from '@/lib/hackersheet'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESC,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function HomePage() {
  const picupSlugs = await getPicupSlugs()

  return (
    <main
      className={`
        container mx-auto flex flex-col gap-10 px-4
        md:px-0
      `}
    >
      <ProfileSection />
      <section>
        <Heading>最近公開された記事</Heading>
        <Suspense fallback={<DocumentListSkeleton length={RECENT_DOCS_COUNT} />}>
          <RecentDocumentList />
        </Suspense>
        <div className="my-8 text-center">
          <Link href="/docs" icon="arrow">
            すべての記事を見る
          </Link>
        </div>
      </section>
      <section>
        <Heading>おすすめの記事</Heading>
        <Suspense fallback={<DocumentListSkeleton length={picupSlugs.length} />}>
          <PickupDocumentList />
        </Suspense>
      </section>
      <section>
        <div className="my-8 text-center">
          <Link href="/tags" icon="arrow">
            記事をタグで探す
          </Link>
        </div>
      </section>
    </main>
  )
}

function ProfileSection() {
  return (
    <section className="mx-auto flex items-start justify-center gap-4 py-10">
      <div className="w-fit">
        <Avater size="sm" />
      </div>
      <div className="max-w-sm text-sm text-muted-foreground">
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
  const picupSlugs = await getPicupSlugs()

  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, slugs: picupSlugs },
    sort: { by: 'published_at', order: 'desc' },
    first: picupSlugs.length,
  })

  if (totalCount === 0) return <NotFoundMessage>おすすめの記事はありません。</NotFoundMessage>

  return <DocumentList documents={documents} />
}

async function RecentDocumentList() {
  const picupSlugs = await getPicupSlugs()
  const { documents, totalCount } = await client.getDocuments({
    filter: { draft: false, excludeSlugs: picupSlugs },
    sort: { by: 'published_at', order: 'desc' },
    first: RECENT_DOCS_COUNT,
  })

  if (totalCount === 0) return <NotFoundMessage>最近公開された記事はありません。</NotFoundMessage>

  return <DocumentList documents={documents} />
}

function NotFoundMessage({ children }: PropsWithChildren) {
  return <p className="text-center text-muted-foreground">{children}</p>
}

function Heading({ children }: PropsWithChildren) {
  return <h2 className="my-4 text-center text-xl font-bold">{children}</h2>
}

async function getPicupSlugs() {
  const { tree } = await client.getTree({ slug: 'pickup' })
  return (
    tree?.flatNodes.map((node) => node.document?.slug).filter((slug) => slug !== undefined) ?? []
  )
}
