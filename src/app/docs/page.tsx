import { Metadata } from 'next'

import { getDocuments } from '@/actions'
import { DocumentList, DocumentFilter } from '@/components/document'
import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'

const title = 'Docs'
const description = 'naopoyo.comのすべての記事の一覧ページです。'

export const metadata: Metadata = {
  title: title,
  description: description,
}

export interface DocsPageProps {
  searchParams: Promise<{ keyword?: string; by?: string }>
}

export const revalidate = 60

export default async function DocsPage(props: DocsPageProps) {
  const searchParams = await props.searchParams
  const keyword = searchParams.keyword
  const sortOptions = new Map([['modified_at', 'modified_at']])
  const sortBy = sortOptions.get(searchParams.by ?? '') || 'published_at'
  const { documents, totalCount } = await getDocuments({ keyword, sortBy })
  const isNotFound = keyword && totalCount === 0

  return (
    <Container className="flex flex-col gap-8 pt-16">
      <PageHeader title={title} description={description} />
      <DocumentFilter keyword={keyword} sortBy={sortBy} totalCount={totalCount} />
      <section>
        {isNotFound ? <DocumentListNotFound /> : <DocumentList documents={documents} />}
      </section>
    </Container>
  )
}

function DocumentListNotFound() {
  return <div className="text-center">検索結果がありませんでした。</div>
}
