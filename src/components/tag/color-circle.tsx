import { cn } from '@/lib/shadcn-utils'
import { stringToColorWithFrame } from '@/lib/string-to-color-with-frame'

type ColorCircleProps = {
  value: string
}

export default function ColorCircle({ value }: ColorCircleProps) {
  const [color, borderColor] = stringToColorWithFrame(value)

  return (
    <div
      className={cn('size-full rounded-full border')}
      style={{ backgroundColor: color, borderColor: borderColor }}
    />
  )
}
