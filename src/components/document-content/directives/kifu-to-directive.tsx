import Link from 'next/link'
import { ReactNode } from 'react'
import { ExtraProps } from 'react-markdown'

export default function KifuToDirective(props: { children: ReactNode } & ExtraProps) {
  const { children, node } = props
  const childrenElm = <>{children}</>

  if (!node) return childrenElm
  if (typeof children !== 'string') return childrenElm

  const [id, ply] = children.split(':')
  const fullId = `user-content-${id}`
  const href = `?ply=${ply}#${fullId}`
  const label = node.properties.label ? node.properties.label : `${ply}手目`

  return <Link href={href}>{label}</Link>
}
