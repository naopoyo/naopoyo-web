import { stringToColorWithFrame } from '@/lib/string-to-color-with-frame'
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
  grid grid-cols-1 gap-6
  sm:grid-cols-2
  lg:grid-cols-3
`

/**
 * ドキュメントカードの CSS クラス
 * @internal
 */
const CARD_CLASS = `
  group relative row-span-3 grid grid-rows-subgrid gap-y-4 overflow-hidden rounded-xl border bg-card
  p-6 transition-all duration-300 ease-out
  hover:border-foreground/10 hover:shadow-md
  active:scale-[0.98] active:bg-muted/50
`

/**
 * プレビュー画像コンテナの CSS クラス
 * @internal
 */
const PREVIEW_CONTAINER_CLASS = `-mx-6 -mt-6 overflow-hidden`

/**
 * プレビュー画像の CSS クラス
 * @internal
 */
const PREVIEW_IMAGE_CLASS = `
  w-full transition-transform duration-300 ease-out
  group-hover:scale-105
`

/**
 * 絵文字コンテナの CSS クラス
 * @internal
 */
const EMOJI_CONTAINER_CLASS = `
  flex h-32 items-center justify-center text-7xl transition-transform duration-300 ease-out
  group-hover:scale-110
`

/**
 * タイトルの CSS クラス
 * @internal
 */
const TITLE_CLASS = `text-lg/snug font-medium break-all text-foreground`

/**
 * メタデータコンテナの CSS クラス
 * @internal
 */
const METADATA_CLASS = `flex flex-col gap-3 text-xs text-muted-foreground`

/**
 * 日付の CSS クラス
 * @internal
 */
const DATE_CLASS = `flex items-center gap-1.5`

/**
 * タグリストの CSS クラス
 * @internal
 */
const TAG_LIST_CLASS = `flex flex-wrap justify-end gap-1.5`

/**
 * タグの CSS クラス
 * @internal
 */
const TAG_CLASS = `
  flex items-center gap-1.5 rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground
`

/**
 * タグの色付きドットの CSS クラス
 * @internal
 */
const TAG_DOT_CLASS = `size-1.5 shrink-0 rounded-full`

/**
 * DocumentList コンポーネント - ドキュメントカードのグリッドを表示します
 *
 * ドキュメントをカード形式でグリッド表示し、プレビュー画像、タイトル、
 * 公開日・更新日、タグなどの情報を表示します。
 * レスポンシブデザイン対応で、モバイルでは1列、タブレットでは2列、デスクトップでは3列表示です。
 *
 * @param props - DocumentListProps
 * @returns ドキュメントカードを含むグリッド要素
 */
export default function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className={GRID_CONTAINER_CLASS}>
      {documents.map((document) => {
        const displayDate = document.modifiedAt || document.publishedAt

        return (
          <NextLink key={document.id} href={`/docs/${document.slug}`} className={CARD_CLASS}>
            {/* プレビュー画像または絵文字 */}
            <div className="flex items-center justify-center">
              {document.preview ? (
                <picture className={PREVIEW_CONTAINER_CLASS}>
                  <img
                    src={document.preview.fileUrl}
                    width={document.preview.width}
                    height={document.preview.height}
                    alt=""
                    loading="lazy"
                    className={PREVIEW_IMAGE_CLASS}
                  />
                </picture>
              ) : (
                <div className={EMOJI_CONTAINER_CLASS}>
                  <DocumentEmoji emoji={document.emoji} />
                </div>
              )}
            </div>

            {/* タイトル */}
            <h3 className={TITLE_CLASS}>{document.title}</h3>

            {/* メタデータ: 日付とタグ */}
            <div className={METADATA_CLASS}>
              <time dateTime={displayDate} className={DATE_CLASS}>
                <span>{timeAgo(displayDate)}</span>
                <span aria-hidden="true">·</span>
                <span>{DATE_FORMAT(displayDate)}</span>
              </time>

              {document.tags.length > 0 && (
                <ul className={TAG_LIST_CLASS}>
                  {document.tags.map((tag) => {
                    const [color, borderColor] = stringToColorWithFrame(tag.name)
                    return (
                      <li key={tag.id} className={TAG_CLASS}>
                        <span
                          className={TAG_DOT_CLASS}
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 0 0 0.5px ${borderColor}`,
                          }}
                          aria-hidden="true"
                        />
                        <span>{tag.name}</span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </NextLink>
        )
      })}
    </div>
  )
}
