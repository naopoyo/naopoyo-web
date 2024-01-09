import { Element } from 'hast'
import { ReactNode, Suspense } from 'react'
import { ExtraProps } from 'react-markdown'
import { TweetSkeleton } from 'react-tweet'

import Tweet from './tweet'

export default function XPostDirective({ children, node }: { children: ReactNode } & ExtraProps) {
  const childrenElm = <p>{children}</p>

  if (!node) return childrenElm

  const href = (node['children'][0] as Element).properties?.href

  if (!href || typeof href !== 'string') return <p>{children}</p>

  const id = getIdFromTwitterUrl(href)

  if (!id) return <p>{children}</p>

  return (
    <Suspense fallback={<TweetSkeleton />}>
      <Tweet id={id} />
    </Suspense>
  )
}

function getIdFromTwitterUrl(value: string) {
  try {
    const url = new URL(value)
    if (/(^|\.)(twitter|x).com$/.test(url.host)) {
      return url.pathname.match(/\/status(es)?\/(\d+)/)?.[2]
    }
  } catch {
    return
  }
}
