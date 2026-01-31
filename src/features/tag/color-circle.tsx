import { cn } from '@/lib/shadcn-utils'
import { stringToColorWithFrame } from '@/lib/string-to-color-with-frame'

/**
 * ColorCircle の Props
 */
type ColorCircleProps = {
  /** 色の元になる文字列 */
  value: string
  /** グロー効果を有効にする */
  glow?: boolean
  /** サイズバリアント */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * サイズバリアントに対応するCSSクラス
 * @internal
 */
const SIZE_CLASSES = {
  sm: 'size-1.5',
  md: 'size-2.5',
  lg: 'size-3.5',
} as const

/**
 * ColorCircle コンポーネント - 与えられた文字列に基づいた背景色と枠色の丸を描画します。
 *
 * 文字列から一意の色を生成し、微妙なグロー効果とトランジションで
 * 視覚的なフィードバックを提供します。
 *
 * @param props - ColorCircleProps
 * @returns 色付きの丸要素
 */
export default function ColorCircle({ value, glow = false, size }: ColorCircleProps) {
  const [color, borderColor] = stringToColorWithFrame(value)

  return (
    <span
      className={cn(
        'block shrink-0 rounded-full',
        'transition-all duration-300 ease-out',
        size ? SIZE_CLASSES[size] : 'size-full'
      )}
      style={{
        backgroundColor: color,
        boxShadow: glow
          ? `0 0 0 1px ${borderColor}, 0 0 8px 2px ${color}40`
          : `0 0 0 1px ${borderColor}`,
      }}
      aria-hidden="true"
    />
  )
}
