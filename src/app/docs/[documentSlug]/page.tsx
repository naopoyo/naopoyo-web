import { Metadata } from 'next'
import Image from 'next/image'
import NextLink from 'next/link'
import { notFound } from 'next/navigation'

import { DocumentList, DocumentContent, DocumentEmoji, DocumentToc } from '@/components/document'
import DropdownToc from '@/components/document/dropdown-toc'
import { Link } from '@/components/link'
import { getDocument, getDocuments } from '@/lib/hackersheet'
import { createDateFormat, timeAgo } from '@/utils'

interface DocumentPageProps {
  params: { documentSlug: string }
}

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata({
  params: { documentSlug },
}: DocumentPageProps): Promise<Metadata> {
  const { document } = await getDocument({ slug: documentSlug })

  if (!document) return {}

  return {
    title: document.title,
  }
}

export default async function DocumentPage({ params: { documentSlug } }: DocumentPageProps) {
  const { document } = await getDocument({ slug: documentSlug })
  const df = createDateFormat('yyyy-MM-dd')

  if (!document || document.draft) {
    return notFound()
  }

  const { documents: resentDocuments } = await getDocuments({
    first: 3,
    filter: { draft: false, excludeSlugs: [document.slug] },
    sort: { by: 'published_at', order: 'desc' },
  })

  const showModified = document.publishedAt !== document.modifiedAt
  const showTags = document.tags.length > 0
  const showInboundLinkDocuments = document.inboundLinkDocuments.length > 0
  const showRecentDocuments = resentDocuments.length > 0
  const historyUrl = process.env.HACKERSHEET_GITHUB_REPO_URL
    ? process.env.HACKERSHEET_GITHUB_REPO_URL + '/commits/main/' + document.path
    : undefined

  return (
    <>
      <header className="my-16 flex w-full flex-col gap-10 px-4 md:px-0">
        <div className="text-center text-7xl">
          <DocumentEmoji emoji={document.emoji} />
        </div>
        <h1 className="text-center text-4xl font-bold">{document.title}</h1>
        <div className="flex flex-row justify-center gap-10">
          <div>
            <div className="text-center">公開日</div>
            <div className="text-gray-400">
              {timeAgo(document.publishedAt)} - {df(document.publishedAt)}
            </div>
          </div>
          {showModified && (
            <div>
              <div className="text-center">更新日</div>
              <div className="text-gray-400">
                {timeAgo(document.modifiedAt)} - {df(document.modifiedAt)}
              </div>
            </div>
          )}
        </div>
        {historyUrl && (
          <div className="text-center">
            <Link href={historyUrl}>更新履歴</Link>
          </div>
        )}
        {showTags && (
          <ul className="flex flex-row justify-center gap-4">
            {document.tags.map((tag) => (
              <li key={tag.id}>
                <NextLink
                  href={`/tags/${tag.name}`}
                  className="block rounded bg-app-bg3 px-3 py-1 hover:scale-110 hover:duration-500"
                >
                  {tag.name}
                </NextLink>
              </li>
            ))}
          </ul>
        )}
      </header>
      {document.preview && (
        <div className="my-16">
          <picture>
            <Image
              src={document.preview.fileUrl}
              width={document.preview.width}
              height={document.preview.height}
              alt="preview"
              loading="lazy"
            />
          </picture>
        </div>
      )}
      <div className="mx-auto flex max-w-max flex-row gap-12">
        <div className="w-full px-4 md:w-[768px] md:px-0">
          <main>
            <DocumentContent document={document} permaLinkFormat="/docs/{{slug}}" />
          </main>
        </div>
        <aside className="hidden w-[300px] md:inline-block">
          <div className="font-bold text-gray-300">目次</div>
          <div className="sticky top-[64px] p-2">
            <DocumentToc />
          </div>
        </aside>
      </div>
      {showInboundLinkDocuments && (
        <section className="mt-16 p-8 text-center">
          <h2 className="mb-8 text-xl font-bold">この記事にリンクしている記事</h2>
          <DocumentList documents={document.inboundLinkDocuments} />
        </section>
      )}
      {showRecentDocuments && (
        <section className="mt-16 p-8 text-center">
          <h2 className="mb-8 text-xl font-bold">最近公開された記事</h2>
          <DocumentList documents={resentDocuments} />
        </section>
      )}
      <footer className="flex h-96 flex-col items-center justify-end p-8">
        <p>&copy; naopoyo</p>
      </footer>

      <DropdownToc />
    </>
  )
}
