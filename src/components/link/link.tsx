import { type ClassProp } from 'class-variance-authority/types'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/shadcn-utils'

export type LinkProps = PropsWithChildren & NextLinkProps & ClassProp

export default function Link(props: LinkProps) {
  return (
    <NextLink href={props.href} className={cn('text-link hover:underline', props.className)}>
      {props.children}
    </NextLink>
  )
}
