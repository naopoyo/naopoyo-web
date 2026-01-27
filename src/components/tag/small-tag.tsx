import { cn } from '@/lib/shadcn-utils'

import { NextLink } from '../link'
import ColorCircle from './color-circle'

/**
 * SmallTag の Props
 */
export type SmallTagProps = {
  /** タグの表示名 */
  tagName: string
  /** 追加のCSSクラス */
  className?: string
}

/**
 * タグリンクの CSS クラス
 * @internal
 */
const TAG_LINK_CLASS = `
  group/tag inline-flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-sm
  text-foreground/80 transition-all duration-300 ease-out
  hover:border-foreground/10 hover:bg-muted/50 hover:text-foreground hover:shadow-sm
  focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none
  active:scale-[0.97]
`

/**
 * SmallTag コンポーネント - タグの小さなリンク表示をします。
 *
 * ホバー時にグロー効果とシャドウで視覚的なフィードバックを提供し、
 * タッチデバイスでもスケールアニメーションで応答性を示します。
 *
 * @param props - SmallTagProps
 * @returns タグリンクを含む JSX
 */
export default function SmallTag({ tagName, className }: SmallTagProps) {
  return (
    <NextLink href={`/tags/${tagName}`} className={cn(TAG_LINK_CLASS, className)}>
      <span
        className="
          transition-transform duration-300 ease-out
          group-hover/tag:scale-110
        "
      >
        <ColorCircle value={tagName} size="sm" />
      </span>
      <span>{tagName}</span>
    </NextLink>
  )
}
