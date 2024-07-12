import { type ClassProp } from 'class-variance-authority/types'
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

export type LinkProps = PropsWithChildren &
  NextLinkProps &
  ClassProp & {
    icon?: false | 'arrow' | 'external'
    iconSize?: number
  }

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
      className={cn('text-link hover:underline inline-flex items-center gap-1', className)}
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
