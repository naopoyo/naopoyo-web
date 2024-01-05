import { Element, Text } from 'hast'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import Markdown, { ExtraProps, Options } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import styles from '@/styles/document-content.module.scss'
import 'katex/dist/katex.min.css'

import CodeBlock from './document-content/code-block'
import processInternalLinks from './rehype-plugins/process-internal-links'

import type { Document } from '@/lib/hackersheet/types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'link-card': { children: ReactNode } & ExtraProps
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
    <a
      href={website.url}
      className="my-4 flex flex-col-reverse rounded-lg border border-gray-500 !no-underline hover:bg-slate-500/10 md:flex-row"
    >
      <div className="flex flex-auto flex-col overflow-hidden px-4 py-2">
        <div className="flex-auto">{website.ogTitle || website.title || website.url}</div>
        <div className="mb-2 text-xs text-gray-600">
          {website.ogDescription || website.description}
        </div>
        <div className="text-nowrap text-gray-500">{website.domain}</div>
      </div>
      {website.ogImage && (
        <div>
          <Image
            alt={website.ogTitle || website.title}
            src={website.ogImage.file}
            height={website.ogImage.height}
            width={website.ogImage.width}
            className="aspect-auto max-w-full rounded-lg object-cover md:max-h-80 md:max-w-80"
          />
        </div>
      )}
    </a>
  )
}
