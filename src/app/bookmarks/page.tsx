import { Metadata } from 'next'

import { LinkCard } from '@/components/link-card'
import { getWebsites } from '@/lib/hackersheet'

export const metadata: Metadata = {
  title: 'Bookmarks',
}

export default async function BookmarksPage() {
  const { websites, isEmpty } = await getWebsites()

  return (
    <>
      <h1 className="py-16 text-center text-4xl font-bold">Bookmarks</h1>
      <section className="container p-8">
        {!isEmpty &&
          websites.map((website) => (
            <div key={website.id}>
              <LinkCard
                url={website.url}
                title={website.ogTitle || website.title || website.url}
                description={website.ogDescription || website.description}
                domain={website.domain}
                imageUrl={website.ogImage?.file ?? undefined}
                imageHeight={website.ogImage?.height ?? undefined}
                imageWidth={website.ogImage?.width ?? undefined}
              />
            </div>
          ))}
      </section>
    </>
  )
}
