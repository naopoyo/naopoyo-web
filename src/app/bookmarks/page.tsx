import { Metadata } from 'next'

import { LinkCard } from '@/components/link-card'
import { PageHeader } from '@/components/page-header'
import { getWebsites } from '@/lib/hackersheet'

const title = 'Bookmarks'

export const metadata: Metadata = {
  title: title,
}

export default async function BookmarksPage() {
  const { websites, isEmpty } = await getWebsites()

  return (
    <div className="container">
      <PageHeader>{title}</PageHeader>

      <section className="mx-auto max-w-screen-md">
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
    </div>
  )
}
