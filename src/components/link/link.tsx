import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

export interface LinkProps extends PropsWithChildren, NextLinkProps {}

export default function Link(props: LinkProps) {
  return (
    <NextLink href={props.href} className='text-app-link hover:underline'>
      {props.children}
    </NextLink>
  )
}
