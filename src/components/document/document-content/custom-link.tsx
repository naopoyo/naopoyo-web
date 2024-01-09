import Link from 'next/link'
import { ExtraProps } from 'react-markdown'

export default function CustomLink({ href, children }: JSX.IntrinsicElements['a'] & ExtraProps) {
  if (!href) {
    return <>{children}</>
  }

  return <Link href={href}>{children}</Link>
}
