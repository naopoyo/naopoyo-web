import Link from 'next/link'

import { DocumentEmoji } from '@/features/document'
import { DocumentList } from '@/features/document/types'
import { createDateFormat, timeAgo } from '@/utils'

export interface DocumentListProps {
  documents: DocumentList
}

export default async function DocumentList({ documents }: DocumentListProps) {
  const df = createDateFormat('yyyy-MM-dd')

  return (
    <div className='grid md:grid-cols-3 grid-cols-1 gap-8'>
      {documents.map((document) => (
        <Link
          key={document.id}
          href={`/docs/${document.slug}`}
          className='grid gap-y-4 grid-template-rows-subgrid row-span-3 p-8 rounded-xl bg-app-bg2 border border-app-bg3/80 hover:transform hover:duration-500 hover:scale-105'
        >
          <div className='flex items-center justify-center'>
            {document.preview ? (
              <picture>
                <img
                  src={document.preview.fileUrl}
                  width={document.preview.width}
                  height={document.preview.height}
                  alt='preview'
                  loading='lazy'
                />
              </picture>
            ) : (
              <div className='text-center text-7xl'>
                <DocumentEmoji emoji={document.emoji} />
              </div>
            )}
          </div>
          <div className='text-lg'>{document.title}</div>
          <div className='flex flex-col gap-4 text-center text-gray-300 text-xs'>
            <div>
              {timeAgo(document.publishedAt)} - {df(document.publishedAt)}
            </div>
            {document.tags.length > 0 && (
              <ul className='flex flex-row justify-end gap-2'>
                {document.tags.map((tag) => (
                  <li key={tag.id} className='px-2 py-1 text-xs rounded bg-app-bg3'>
                    {tag.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
