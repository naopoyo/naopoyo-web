import { NextLink } from '../link'
import ColorCircle from './color-circle'

import type { TagList } from '@/lib/hackersheet'

/**
 * TagList の Props
 */
export type TagListProps = {
  tags: TagList
}

/**
 * TagList コンポーネント - タグ一覧をグリッドで表示します（サーバーコンポーネント）。
 */
export default async function TagList({ tags }: TagListProps) {
  return (
    <div
      className={`
        grid grid-cols-2 gap-8
        md:grid-cols-6
      `}
    >
      {tags.map(
        (tag) =>
          tag.documentCountInPublished > 0 && (
            <NextLink
              key={tag.id}
              href={`/tags/${tag.name}`}
              className={`
                flex h-fit flex-col gap-4 rounded-xl border p-4
                hover:bg-muted/50
              `}
            >
              <div className="flex flex-row items-center gap-4">
                <div className="size-3">
                  <ColorCircle value={tag.name} />
                </div>
                <div className="flex-auto">{tag.name}</div>
                <div className="text-muted-foreground">{tag.documentCountInPublished}</div>
              </div>
            </NextLink>
          )
      )}
    </div>
  )
}
