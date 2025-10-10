import Link from 'next/link'

import { createDateFormat, timeAgo } from '@/utils'

import DocumentEmoji from './document-emoji'

import type { DocumentList as DocumentListType } from '@/lib/hackersheet'

/**
 * DocumentList の Props
 *
 * documents - レンダリングするドキュメント配列
 */
export type DocumentListProps = {
  /** レンダリング対象のドキュメント配列 */
  documents: DocumentListType
}

/**
 * DocumentList コンポーネント - ドキュメントカードのグリッドを表示します。
 *
 * @param props - DocumentListProps
 * @returns ドキュメントカードを含む JSX 要素
 */
export default function DocumentList({ documents }: DocumentListProps) {
  const df = createDateFormat('yyyy年MM月dd日')

  return (
    <div
      className={`
        grid grid-cols-1 gap-8
        md:grid-cols-3
      `}
    >
      {documents.map((document) => (
        <Link
          key={document.id}
          href={`/docs/${document.slug}`}
          className={`
            row-span-3 grid grid-rows-subgrid gap-y-4 overflow-hidden rounded-xl border bg-card p-6
            hover:bg-card/50
          `}
        >
          <div className="flex items-center justify-center">
            {document.preview ? (
              <picture className="-mx-6 -mt-6">
                <img
                  src={document.preview.fileUrl}
                  width={document.preview.width}
                  height={document.preview.height}
                  alt="preview"
                  loading="lazy"
                />
              </picture>
            ) : (
              <div className="py-8 text-center text-7xl">
                <DocumentEmoji emoji={document.emoji} />
              </div>
            )}
          </div>
          <div className="text-lg break-all">{document.title}</div>
          <div className={`flex flex-col gap-4 text-center text-xs text-muted-foreground`}>
            {document.modifiedAt ? (
              <div>
                {timeAgo(document.modifiedAt)} - {df(document.modifiedAt)}
              </div>
            ) : (
              <div>
                {timeAgo(document.publishedAt)} - {df(document.publishedAt)}
              </div>
            )}

            {document.tags.length > 0 && (
              <ul className="flex flex-row justify-end gap-2">
                {document.tags.map((tag) => (
                  <li
                    key={tag.id}
                    className={`rounded border bg-secondary px-2 py-1 text-xs text-foreground`}
                  >
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
