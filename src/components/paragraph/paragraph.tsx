import { ClassProp } from 'class-variance-authority/types'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

/**
 * Paragraph の Props
 */
export type ParagraphProps = PropsWithChildren & ClassProp

/**
 * Paragraph コンポーネント - 通常の段落テキストをレンダリングします。
 *
 * @param props - ParagraphProps
 * @returns 段落の JSX
 */
export default function Paragraph({ className, children }: ParagraphProps) {
  return <p className={cn('my-4 leading-8', className)}>{children}</p>
}
