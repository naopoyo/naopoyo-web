import Link from 'next/link'
import { ExtraProps } from 'react-markdown'

export default function CustomLink({
  href,
  id,
  children,
}: JSX.IntrinsicElements['a'] & ExtraProps) {
  if (!href) {
    return <>{children}</>
  }

  return (
    <Link href={href} id={id}>
      {children}
    </Link>
  )
}
