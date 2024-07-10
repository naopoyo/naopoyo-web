import { Metadata } from 'next'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import { DocumentList } from '@/components/document'
import { PageHeader } from '@/components/page-header'
import { client } from '@/lib/hackersheet'

interface TagPageProps {
  params: { tagName: string }
}

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata({ params: { tagName } }: TagPageProps): Promise<Metadata> {
  const decodedTagName = decodeURI(tagName)
  const { tag } = await client.getTag({ name: decodedTagName })

  if (!tag) return {}

  return {
    title: `${tag.name} - Tags`,
  }
}

export default async function TagPage({ params: { tagName } }: TagPageProps) {
  const decodedTagName = decodeURI(tagName)
  const { tag } = await client.getTag({ name: decodedTagName })

  if (!tag || tag.documentCountInPublished === 0) {
    return notFound()
  }

  const { documents, totalCount } = await client.getDocuments({
    filter: { tags: [tag.name], draft: false },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <div className="container">
      <div className="text-center text-lg font-bold text-muted-foreground">Tag</div>

      <PageHeader>{tag.name}</PageHeader>

      {tag.relatedTags.length > 0 && (
        <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="text-nowrap text-sm text-muted-foreground">関連タグ:</div>
          <ul className="flex flex-row flex-wrap gap-4">
            {tag.relatedTags.map((tag) => (
              <li key={tag.id} className="text-nowrap">
                <NextLink
                  href={`/tags/${tag.name}`}
                  className="block rounded border bg-primary-foreground px-3 py-1 text-sm hover:scale-110 hover:duration-500"
                >
                  {tag.name}
                </NextLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mx-auto mb-10 flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="text-muted-foreground">全 {totalCount} 件</div>
      </div>

      <section className="pb-8">
        <DocumentList documents={documents} />
      </section>
    </div>
  )
}
