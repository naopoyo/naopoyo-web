import { ClassProp } from 'class-variance-authority/types'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

/**
 * PageHeader の Props
 */
export type PageHeaderProps = PropsWithChildren & ClassProp

/**
 * PageHeader コンポーネント - セクションの見出しを表示します。
 *
 * @param props - PageHeaderProps
 * @returns 見出し用の JSX
 */
export default function PageHeader({ children, className }: PageHeaderProps) {
  return <h1 className={cn('text-4xl font-bold', className)}>{children}</h1>
}
