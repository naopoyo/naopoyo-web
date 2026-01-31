import { Metadata } from 'next'
import { notFound } from 'next/navigation'


import { MutedMessage } from '@/components/feedback/message'
import { Container } from '@/components/layouts/containers'
import { PageHeader } from '@/components/layouts/page-headers'
import { DocumentList } from '@/features/document'
import { ColorCircle, SmallTag } from '@/features/tag'
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
    <Container className="flex flex-col items-center gap-8 pt-16">
      <PageHeader
        subTitle="Tag"
        title={
          <div className="flex items-center justify-center gap-4">
            <div className="size-4">
              <ColorCircle value={tag.name} />
            </div>
            <div>{tag.name}</div>
          </div>
        }
        description={`${tag.name}に関する記事の一覧ページです。`}
      />

      {tag.relatedTags.length > 0 && (
        <div
          className={`
            mb-10 flex flex-col items-center justify-center gap-4
            sm:flex-row
          `}
        >
          <div className="text-sm text-nowrap text-muted-foreground">関連タグ:</div>
          <ul className="flex flex-row flex-wrap gap-4">
            {tag.relatedTags.map((tag) => (
              <li key={tag.id} className="text-nowrap">
                <SmallTag tagName={tag.name} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <MutedMessage>全 {totalCount} 件</MutedMessage>

      <DocumentList documents={documents} />
    </Container>
  )
}
