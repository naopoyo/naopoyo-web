import { ClassProp } from 'class-variance-authority/types'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

export type PageHeaderProps = PropsWithChildren & ClassProp

export default function PageHeader({ children, className }: PageHeaderProps) {
  return <h1 className={cn('my-16 text-center text-4xl font-bold', className)}>{children}</h1>
}
