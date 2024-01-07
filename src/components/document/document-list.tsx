import Image from 'next/image'
import Link from 'next/link'

import { DocumentEmoji } from '@/components/document'
import { createDateFormat, timeAgo } from '@/utils'

import type { DocumentList } from '@/lib/hackersheet/types'

export interface DocumentListProps {
  documents: DocumentList
}

export default async function DocumentList({ documents }: DocumentListProps) {
  const df = createDateFormat('yyyy-MM-dd')

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {documents.map((document) => (
        <Link
          key={document.id}
          href={`/docs/${document.slug}`}
          className="row-span-3 grid grid-cols-subgrid gap-y-4 rounded-xl border p-8 hover:scale-105 hover:duration-500"
        >
          <div className="flex items-center justify-center">
            {document.preview ? (
              <picture>
                <Image
                  src={document.preview.fileUrl}
                  width={document.preview.width}
                  height={document.preview.height}
                  alt="preview"
                  loading="lazy"
                />
              </picture>
            ) : (
              <div className="text-center text-7xl">
                <DocumentEmoji emoji={document.emoji} />
              </div>
            )}
          </div>
          <div className="break-all text-lg">{document.title}</div>
          <div className="flex flex-col gap-4 text-center text-xs text-gray-300">
            <div>
              {timeAgo(document.publishedAt)} - {df(document.publishedAt)}
            </div>
            {document.tags.length > 0 && (
              <ul className="flex flex-row justify-end gap-2">
                {document.tags.map((tag) => (
                  <li key={tag.id} className="rounded px-2 py-1 text-xs">
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
