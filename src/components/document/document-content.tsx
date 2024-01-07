import { Element, Text } from 'hast'
import Link from 'next/link'
import { ReactNode, Suspense } from 'react'
import Markdown, { ExtraProps, Options } from 'react-markdown'
import { TweetSkeleton } from 'react-tweet'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { LinkCard } from '@/components/link-card'
import styles from '@/styles/document-content.module.scss'
import 'katex/dist/katex.min.css'

import CodeBlock from './document-content/code-block'
import Tweet from './document-content/tweet'
import processInternalLinks from './rehype-plugins/process-internal-links'

import type { Document } from '@/lib/hackersheet/types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'link-card': { children: ReactNode } & ExtraProps
      tweet: { children: ReactNode } & ExtraProps
    }
  }
}

export interface DocumentContentProps {
  document: Document
  permaLinkFormat: string
}

export default function DocumentContent({ document, permaLinkFormat }: DocumentContentProps) {
  const options: Options = {
    children: document.content,
    remarkPlugins: [remarkGfm, remarkMath, remarkDirective, remarkDirectiveRehype],
    rehypePlugins: [
      rehypeSlug,
      [processInternalLinks, { document: document, permaLinkFormat: permaLinkFormat }],
      rehypeKatex,
    ],
    components: {
      a: customLink,
      pre: customPre,
      'link-card': (props) => linkCard(props, document),
      tweet: tweet,
    },
  }

  return <Markdown className={styles['document-content']} {...options} />
}

function customLink(props: JSX.IntrinsicElements['a'] & ExtraProps) {
  const { href, children } = props

  if (!href) {
    return <>{children}</>
  }

  return href.startsWith('/') || href === '' ? (
    <Link href={href}>{children}</Link>
  ) : (
    <a href={href}>{children}</a>
  )
}

function customPre(props: JSX.IntrinsicElements['pre'] & ExtraProps) {
  const { children, node } = props

  if (!node) {
    return <>{children}</>
  }

  const code = node['children'][0] as Element

  if (code['type'] !== 'element' || code['tagName'] !== 'code') {
    return <>{children}</>
  }

  const text = code['children'][0] as Text

  if (text['type'] !== 'text') {
    return <>{children}</>
  }

  const className = code.properties.className as string
  const codeValue = text.value as string

  const match = /language-(.+)/.exec(className || '')
  const tmpLanguage = match && match[1] ? (match[1] as string) : ''
  const [language, filename] = tmpLanguage.split(':')

  return <CodeBlock code={codeValue} language={language} filename={filename} />
}

function linkCard(props: { children: ReactNode } & ExtraProps, document: Document) {
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
      imageUrl={website.ogImage?.file}
      imageHeight={website.ogImage?.height}
      imageWidth={website.ogImage?.width}
    />
  )
}

function tweet(props: { children: ReactNode } & ExtraProps) {
  const { children, node } = props

  if (!node) {
    return <p>{children}</p>
  }

  const href = (node['children'][0] as Element).properties?.href

  if (!href || typeof href !== 'string') {
    return <p>{children}</p>
  }

  const getIdFromTwitterUrl = (str: string) => {
    const url = new URL(str)
    if (/(^|\.)(twitter|x).com$/.test(url.host)) {
      return url.pathname.match(/\/status(es)?\/(\d+)/)?.[2]
    }
  }

  const id = getIdFromTwitterUrl(href)

  if (!id) {
    return <p>{children}</p>
  }

  return (
    <Suspense fallback={<TweetSkeleton />}>
      <Tweet id={id} />
    </Suspense>
  )
}
