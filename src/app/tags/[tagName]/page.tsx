import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DocumentList } from '@/components/document'
import { PageHeader } from '@/components/page-header'
import { SmallTag } from '@/components/tag'
import { client } from '@/lib/hackersheet'

interface TagPageProps {
  params: Promise<{ tagName: string }>
}

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata(props: TagPageProps): Promise<Metadata> {
  const params = await props.params

  const { tagName } = params

  const decodedTagName = decodeURI(tagName)
  const { tag } = await client.getTag({ name: decodedTagName })

  if (!tag) return {}

  return {
    title: `${tag.name} - Tags`,
    description: `${tag.name}に関する記事の一覧ページです。`,
  }
}

export default async function TagPage(props: TagPageProps) {
  const params = await props.params

  const { tagName } = params

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
      <div className="my-16 flex flex-col items-center gap-4">
        <div className="text-lg font-bold text-muted-foreground">Tag</div>

        <PageHeader>{tag.name}</PageHeader>

        <p className="text-sm text-muted-foreground">{tag.name}に関する記事の一覧ページです。</p>
      </div>

      {tag.relatedTags.length > 0 && (
        <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="text-nowrap text-sm text-muted-foreground">関連タグ:</div>
          <ul className="flex flex-row flex-wrap gap-4">
            {tag.relatedTags.map((tag) => (
              <li key={tag.id} className="text-nowrap">
                <SmallTag tagName={tag.name} />
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
