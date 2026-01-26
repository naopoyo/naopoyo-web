import { createDateFormat, timeAgo } from '@/utils'

import DocumentEmoji from './document-emoji'
import { NextLink } from '../link'

import type { DocumentList as DocumentListType } from '@/lib/hackersheet'

/**
 * DocumentList コンポーネントの Props
 */
export type DocumentListProps = {
  /** レンダリング対象のドキュメント配列 */
  documents: DocumentListType
}

/**
 * 日付フォーマッター
 * @internal
 */
const DATE_FORMAT = createDateFormat('yyyy年MM月dd日')

/**
 * グリッドコンテナの CSS クラス
 * @internal
 */
const GRID_CONTAINER_CLASS = `
  grid grid-cols-1 gap-8
  md:grid-cols-3
`

/**
 * ドキュメントカードの CSS クラス
 * @internal
 */
const CARD_CLASS = `
  row-span-3 grid grid-rows-subgrid gap-y-4 overflow-hidden rounded-xl border bg-card p-6
  hover:bg-card/50
`

/**
 * タグの CSS クラス
 * @internal
 */
const TAG_CLASS = 'rounded-sm border bg-secondary px-2 py-1 text-xs text-foreground'

/**
 * メタデータの CSS クラス
 * @internal
 */
const METADATA_CLASS = 'flex flex-col gap-4 text-center text-xs text-muted-foreground'

/**
 * DocumentList コンポーネント - ドキュメントカードのグリッドを表示します
 *
 * ドキュメントをカード形式でグリッド表示し、プレビュー画像、タイトル、
 * 公開日・更新日、タグなどの情報を表示します。
 * レスポンシブデザイン対応で、モバイルでは1列、デスクトップでは3列表示です。
 *
 * @param props - DocumentListProps
 * @returns ドキュメントカードを含むグリッド要素
 */
export default function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className={GRID_CONTAINER_CLASS}>
      {documents.map((document) => (
        <NextLink key={document.id} href={`/docs/${document.slug}`} className={CARD_CLASS}>
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
          <div className={METADATA_CLASS}>
            {document.modifiedAt ? (
              <div>
                {timeAgo(document.modifiedAt)} - {DATE_FORMAT(document.modifiedAt)}
              </div>
            ) : (
              <div>
                {timeAgo(document.publishedAt)} - {DATE_FORMAT(document.publishedAt)}
              </div>
            )}

            {document.tags.length > 0 && (
              <ul className="flex flex-row justify-end gap-2">
                {document.tags.map((tag) => (
                  <li key={tag.id} className={TAG_CLASS}>
                    {tag.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </NextLink>
      ))}
    </div>
  )
}
