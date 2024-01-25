import { ClassProp } from 'class-variance-authority/types'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

export type FlexRowProps = PropsWithChildren & ClassProp

export default function FlexRow({ className, children }: FlexRowProps) {
  return <div className={cn('flex flex-row', className)}>{children}</div>
}
