import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

import { DocumentList } from '@/components/document'
import { Link } from '@/components/link'
import { Paragraph as P } from '@/components/paragraph'
import { DocumentListSkeleton } from '@/components/skeleton'
import {
  siteDesc,
  siteName,
  pickupDocsCount,
  recentDocsCount,
  pickupDocumentSlugs,
} from '@/constants'
import { client } from '@/lib/hackersheet'

export const metadata: Metadata = {
  title: siteName,
  description: siteDesc,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function HomePage() {
  return (
    <main className="container flex flex-col gap-10">
      <ProfileSection />
      <section>
        <h2 className="my-4 text-center text-xl font-bold">おすすめの記事</h2>
        <Suspense fallback={<DocumentListSkeleton length={pickupDocsCount} />}>
          <PickupDocumentList />
        </Suspense>
      </section>
      <section>
        <h2 className="my-4 text-center text-xl font-bold">最近書いた記事</h2>
        <Suspense fallback={<DocumentListSkeleton length={recentDocsCount} />}>
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
      <Image
        src="/naopoyo2.png"
        width={128}
        height={128}
        alt="logo"
        className="rounded-full border object-cover"
      />
      <div className="text-sm text-muted-foreground">
        <h1 className="text-lg font-bold text-foreground">naopoyo</h1>
        <P>{siteDesc}</P>
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
  const { documents } = await client.getDocuments({
    filter: { draft: false, slugs: pickupDocumentSlugs },
    sort: { by: 'published_at', order: 'desc' },
    first: pickupDocsCount,
  })

  return <DocumentList documents={documents} />
}

async function RecentDocumentList() {
  const { documents } = await client.getDocuments({
    filter: { draft: false, excludeSlugs: pickupDocumentSlugs },
    sort: { by: 'published_at', order: 'desc' },
    first: recentDocsCount,
  })

  return <DocumentList documents={documents} />
}
