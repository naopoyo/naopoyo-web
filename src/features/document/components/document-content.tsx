import { Element, Text } from 'hast'
import Markdown, { ExtraProps, Options } from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { Document } from '@/features/document/types'
import styles from '@/styles/markdown.module.scss'

import CodeBlock from './code-block'
import processInternalLinks from './rehype-plugins/process-internal-links'

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
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [processInternalLinks, { document: document, permaLinkFormat: permaLinkFormat }],
    ],
    components: {
      pre: customPre,
    },
  }

  return <Markdown className={styles.markdown} {...options} />
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
