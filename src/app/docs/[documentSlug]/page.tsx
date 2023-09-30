import { Noto_Color_Emoji } from 'next/font/google'
import { notFound } from 'next/navigation'

import { DocumentContent, DocumentToc, getDocument } from '@/features/document'
import { createDateFormat, timeAgo } from '@/utils'

const notoColorEmoji = Noto_Color_Emoji({ subsets: ['emoji'], weight: ['400'] })

export default async function Document({
  params: { documentSlug },
}: {
  params: { documentSlug: string }
}) {
  const { document } = await getDocument({ slug: documentSlug })
  const df = createDateFormat('yyyy-MM-dd')

  if (!document) {
    return notFound()
  }

  const showModified = document.publishedAt !== document.modifiedAt

  return (
    <>
      <header className='py-16 flex flex-col gap-10'>
        <div className='text-center text-7xl'>
          <span className={notoColorEmoji.className}>{document.emoji}</span>
        </div>
        <h1 className='text-4xl text-center font-bold'>{document.title}</h1>
        <div className='flex flex-row gap-10 justify-center'>
          <div>
            <div>Published</div>
            <div className='text-gray-400'>
              {timeAgo(document.publishedAt)} - {df(document.publishedAt)}
            </div>
          </div>
          {showModified && (
            <div>
              <div>Modified</div>
              <div className='text-gray-400'>
                {timeAgo(document.modifiedAt)} - {df(document.modifiedAt)}
              </div>
            </div>
          )}
        </div>
        <ul className='flex flex-row justify-center gap-4'>
          {document.tags.map((tag) => (
            <li key={tag.id} className='px-3 py-1 rounded bg-app-bg3'>
              {tag.name}
            </li>
          ))}
        </ul>
      </header>
      <div className='flex flex-row max-w-max gap-12 mx-auto'>
        <div className='w-[768px]'>
          <main>
            <DocumentContent document={document} permaLinkFormat='/docs/{{slug}}' />
          </main>
        </div>
        <aside className='w-[300px]'>
          <div className='sticky top-[64px] p-2'>
            <DocumentToc />
          </div>
        </aside>
      </div>
    </>
  )
}
