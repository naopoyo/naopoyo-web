import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  DocumentList,
  DocumentContent,
  DocumentToc,
  getDocument,
  DocumentEmoji,
} from '@/features/document'
import { createDateFormat, timeAgo } from '@/utils'

interface DocumentProps {
  params: { documentSlug: string }
}

export const dynamic = 'force-static'
export const revalidate = 60

export async function generateMetadata({
  params: { documentSlug },
}: DocumentProps): Promise<Metadata> {
  const { document } = await getDocument({ slug: documentSlug })

  if (!document) return {}

  return {
    title: document.title,
  }
}

export default async function Document({ params: { documentSlug } }: DocumentProps) {
  const { document } = await getDocument({ slug: documentSlug })
  const df = createDateFormat('yyyy-MM-dd')

  if (!document || document.draft) {
    return notFound()
  }

  const showModified = document.publishedAt !== document.modifiedAt
  const showTags = document.tags.length > 0
  const showInboundLinkDocuments = document.inboundLinkDocuments.length > 0

  return (
    <>
      <header className='py-16 flex flex-col gap-10 md:px-0 w-full px-4'>
        <div className='text-center text-7xl'>
          <DocumentEmoji emoji={document.emoji} />
        </div>
        <h1 className='text-4xl text-center font-bold'>{document.title}</h1>
        <div className='flex flex-row gap-10 justify-center'>
          <div>
            <div className='text-center'>Published</div>
            <div className='text-gray-400'>
              {timeAgo(document.publishedAt)} - {df(document.publishedAt)}
            </div>
          </div>
          {showModified && (
            <div>
              <div className='text-center'>Modified</div>
              <div className='text-gray-400'>
                {timeAgo(document.modifiedAt)} - {df(document.modifiedAt)}
              </div>
            </div>
          )}
        </div>
        {showTags && (
          <ul className='flex flex-row justify-center gap-4'>
            {document.tags.map((tag) => (
              <li key={tag.id}>
                <Link
                  href={`/tags/${tag.name}`}
                  className='block px-3 py-1 rounded bg-app-bg3 hover:transform hover:duration-500 hover:scale-110'
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>
      <div className='flex flex-row max-w-max gap-12 mx-auto'>
        <div className='md:w-[768px] md:px-0 w-full px-4'>
          <main>
            <DocumentContent document={document} permaLinkFormat='/docs/{{slug}}' />
          </main>
        </div>
        <aside className='hidden md:inline-block w-[300px]'>
          <div className='sticky top-[64px] p-2'>
            <DocumentToc />
          </div>
        </aside>
      </div>
      {showInboundLinkDocuments && (
        <section className='mt-16 p-8 text-center'>
          <h2 className='mb-8 text-xl font-bold'>この記事にリンクしている記事</h2>
          <DocumentList documents={document.inboundLinkDocuments} />
        </section>
      )}
      <footer className='h-96 p-8 flex flex-col items-center justify-end'>
        <p>&copy; naopoyo</p>
      </footer>
    </>
  )
}
