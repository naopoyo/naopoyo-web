import { Element, Text } from 'hast'
import Link from 'next/link'
import Markdown, { ExtraProps, Options } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
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
      customComponent: { test: string }
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
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [processInternalLinks, { document: document, permaLinkFormat: permaLinkFormat }],
      rehypeKatex,
    ],
    components: {
      a: customLink,
      pre: customPre,
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