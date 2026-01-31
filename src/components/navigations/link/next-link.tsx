import Link, { LinkProps } from 'next/link'
import { forwardRef, PropsWithChildren } from 'react'

/**
 * NextLink コンポーネントの Props
 *
 * Next.js の LinkProps に加え、className と aria-* 属性をサポートします。
 */
export type NextLinkProps = LinkProps &
  PropsWithChildren & {
    className?: string
    'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'
  }

/**
 * Next.js の Link コンポーネントをラップしたコンポーネント
 *
 * prefetch が有効化されており、ref のフォワーディングをサポートします。
 */
const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(function NextLink(props, ref) {
  const { children, ...rest } = props
  return (
    <Link {...rest} ref={ref} prefetch={true}>
      {children}
    </Link>
  )
})

export default NextLink
