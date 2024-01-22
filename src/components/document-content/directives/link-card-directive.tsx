import { Element } from 'hast'
import { ReactNode } from 'react'
import { ExtraProps } from 'react-markdown'

import { LinkCard } from '@/components/link-card'
import { Document } from '@/lib/hackersheet/types'

export function LinkCardDirective(props: { children: ReactNode } & ExtraProps, document: Document) {
  const { children, node } = props

  if (!node) {
    return <p>{children}</p>
  }

  const href = (node['children'][0] as Element).properties?.href

  if (!href) {
    return <p>{children}</p>
  }

  const website = document.websites.find((website) => website.url === href)

  if (!website) {
    return <p>{children}</p>
  }

  return (
    <LinkCard
      url={website.url}
      title={website.ogTitle || website.title || website.url}
      description={website.ogDescription || website.description}
      domain={website.domain}
      imageUrl={website.ogImage?.fileUrl}
      imageHeight={website.ogImage?.height}
      imageWidth={website.ogImage?.width}
    />
  )
}
