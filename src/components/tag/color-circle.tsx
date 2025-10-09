import { cn } from '@/lib/shadcn-utils'
import { stringToColorWithFrame } from '@/lib/string-to-color-with-frame'

/**
 * ColorCircle の Props
 *
 * value - 色の元になる文字列
 */
type ColorCircleProps = {
  value: string
}

/**
 * ColorCircle コンポーネント - 与えられた文字列に基づいた背景色と枠色の丸を描画します。
 */
export default function ColorCircle({ value }: ColorCircleProps) {
  const [color, borderColor] = stringToColorWithFrame(value)

  return (
    <div
      className={cn('size-full rounded-full border')}
      style={{ backgroundColor: color, borderColor: borderColor }}
    />
  )
}
