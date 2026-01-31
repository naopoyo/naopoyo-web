import { NextLink } from '../link'
import ColorCircle from './color-circle'

import type { TagList } from '@/lib/hackersheet'

/**
 * TagListProps - TagList コンポーネントの Props
 */
export type TagListProps = {
  /** 表示するタグの配列 */
  tags: TagList
}

/**
 * グリッドコンテナの CSS クラス
 * @internal
 */
const GRID_CONTAINER_CLASS = `
  grid grid-cols-2 gap-4
  sm:grid-cols-3
  md:grid-cols-4
  lg:grid-cols-5
  xl:grid-cols-6
`

/**
 * タグカードの CSS クラス
 * @internal
 */
const TAG_CARD_CLASS = `
  group relative flex h-fit flex-col gap-3 overflow-hidden rounded-xl border bg-card p-4
  transition-all duration-300 ease-out
  hover:border-foreground/10 hover:shadow-md
  focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none
  active:scale-[0.98] active:bg-muted/50
`

/**
 * タグ名の CSS クラス
 * @internal
 */
const TAG_NAME_CLASS = `
  flex-auto truncate font-medium text-foreground/90 transition-colors duration-300 ease-out
  group-hover:text-foreground
`

/**
 * ドキュメント数バッジの CSS クラス
 * @internal
 */
const COUNT_BADGE_CLASS = `
  rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground tabular-nums transition-all
  duration-300 ease-out
  group-hover:bg-secondary/80 group-hover:text-secondary-foreground
`

/**
 * TagList コンポーネント - タグ一覧をグリッドで表示します。
 *
 * 各タグカードにはホバー効果、タッチフィードバック、フォーカス状態が実装されており、
 * レスポンシブデザインで2列から6列まで画面サイズに応じて変化します。
 *
 * @param props - TagListProps
 * @returns タグカードを含むグリッド要素
 */
export default async function TagList({ tags }: TagListProps) {
  const visibleTags = tags.filter((tag) => tag.documentCountInPublished > 0)

  return (
    <div className={GRID_CONTAINER_CLASS}>
      {visibleTags.map((tag) => (
        <NextLink key={tag.id} href={`/tags/${tag.name}`} className={TAG_CARD_CLASS}>
          <div className="flex flex-row items-center gap-3">
            <span
              className="
                transition-transform duration-300 ease-out
                group-hover:scale-125
              "
            >
              <ColorCircle value={tag.name} size="md" glow />
            </span>
            <span className={TAG_NAME_CLASS}>{tag.name}</span>
          </div>
          <div className="flex justify-end">
            <span className={COUNT_BADGE_CLASS}>{tag.documentCountInPublished} docs</span>
          </div>
        </NextLink>
      ))}
    </div>
  )
}
