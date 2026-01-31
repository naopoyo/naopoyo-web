import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

export type HeadingProps = { className?: string } & PropsWithChildren

export default function Heading({ children, className }: HeadingProps) {
  return <h2 className={cn(`text-xl font-bold`, className)}>{children}</h2>
}
