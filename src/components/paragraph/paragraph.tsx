import { ClassProp } from 'class-variance-authority/types'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

export type ParagraphProps = PropsWithChildren & ClassProp

export default function Paragraph({ className, children }: ParagraphProps) {
  return <p className={cn('my-4 leading-8', className)}>{children}</p>
}
