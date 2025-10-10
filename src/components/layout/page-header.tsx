import { ClassProp } from 'class-variance-authority/types'
import { PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/lib/shadcn-utils'

/**
 * PageHeader の Props
 */
export type PageHeaderProps = {
  title: ReactNode
  subTitle?: ReactNode
  description?: ReactNode
} & PropsWithChildren &
  ClassProp

/**
 * PageHeader コンポーネント - セクションの見出しを表示します。
 *
 * @param props - PageHeaderProps
 * @returns 見出し用の JSX
 */
export default function PageHeader({ title, subTitle, description, className }: PageHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-4 text-center', className)}>
      {subTitle && <div className="text-lg font-bold text-muted-foreground">{subTitle}</div>}
      <h1 className="text-4xl font-bold">{title}</h1>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </header>
  )
}
