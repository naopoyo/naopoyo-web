import { Metadata } from 'next'
import { PropsWithChildren, Suspense } from 'react'

import { getPicupSlugs } from '@/actions'
import { DocumentListSkeleton, PickupDocumentList, RecentDocumentList } from '@/components/document'
import { Container } from '@/components/layout'
import { Link } from '@/components/link'
import { Profile } from '@/components/profile'
import { SITE_DESC, SITE_NAME, RECENT_DOCS_COUNT } from '@/constants'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESC,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function HomePage() {
  const picupSlugs = await getPicupSlugs()

  return (
    <Container className="flex flex-col gap-10">
      <Profile />
      <section>
        <Heading>最近更新された記事</Heading>
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
    </Container>
  )
}

function Heading({ children }: PropsWithChildren) {
  return <h2 className="my-4 text-center text-xl font-bold">{children}</h2>
}
