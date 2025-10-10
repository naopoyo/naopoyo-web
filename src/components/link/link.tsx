import { type ClassProp } from 'class-variance-authority/types'
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'
import { LinkProps as NextLinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

import NextLink from './next-link'

/**
 * Link の Props
 */
export type LinkProps = PropsWithChildren &
  NextLinkProps &
  ClassProp & {
    icon?: false | 'arrow' | 'external'
    iconSize?: number
  }

/**
 * Link コンポーネント - Next.js の Link をラップし、アイコン付きリンクを提供します。
 */
export default function Link({
  className,
  children,
  icon = false,
  iconSize = 16,
  ...props
}: LinkProps) {
  const iconElem = ((icon) => {
    switch (icon) {
      case 'arrow':
        return <ArrowRightIcon fontSize={iconSize} size={iconSize} />
      case 'external':
        return <ExternalLinkIcon fontSize={iconSize} size={iconSize} />
      default:
        return false
    }
  })(icon)

  return (
    <NextLink
      {...props}
      className={cn(
        `
          inline-flex items-center gap-1 text-link
          hover:underline
        `,
        className
      )}
    >
      {iconElem ? (
        <>
          <span>{children}</span>
          {iconElem}
        </>
      ) : (
        children
      )}
    </NextLink>
  )
}
