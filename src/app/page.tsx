import { Metadata } from 'next'
import { unstable_cacheLife as cacheLife } from 'next/cache'
import { Suspense } from 'react'

import { getPicupSlugs } from '@/actions'
import { DocumentListSkeleton, PickupDocumentList, RecentDocumentList } from '@/components/document'
import { Container, Section } from '@/components/layout'
import { Link } from '@/components/link'
import { Profile } from '@/components/site'
import { SITE_DESC, SITE_NAME, RECENT_DOCS_COUNT } from '@/constants'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESC,
}

export default async function HomePage() {
  'use cache'
  cacheLife('seconds')

  const picupSlugs = await getPicupSlugs()

  return (
    <Container className="flex flex-col gap-12">
      <Profile />
      <Section heading="最近更新された記事">
        <Suspense fallback={<DocumentListSkeleton length={RECENT_DOCS_COUNT} />}>
          <RecentDocumentList />
        </Suspense>
        <div className="text-center">
          <Link href="/docs" icon="arrow">
            すべての記事を見る
          </Link>
        </div>
      </Section>
      <Section heading="おすすめ記事">
        <Suspense fallback={<DocumentListSkeleton length={picupSlugs.length} />}>
          <PickupDocumentList />
        </Suspense>
      </Section>
      <Section>
        <div className="text-center">
          <Link href="/tags" icon="arrow">
            記事をタグで探す
          </Link>
        </div>
      </Section>
    </Container>
  )
}
