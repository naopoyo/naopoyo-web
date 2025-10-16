import Link, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

export type NextLinkProps = LinkProps & PropsWithChildren & { className?: string }

export default function NextLink(props: NextLinkProps) {
  return (
    <Link {...props} prefetch={false} className={props.className}>
      {props.children}
    </Link>
  )
}
