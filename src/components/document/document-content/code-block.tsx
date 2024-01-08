import React from 'react'

import { highlighteCode } from '@/lib/shiki'
import styles from '@/styles/document-content.module.scss'

import CodeBlockCopyButton from './code-block-copy-button'
import CodeBlockIcon from './code-block-icon'
import CodeBlockMermaid from './code-block-mermaid'
import Kifu from './kifu'

export interface CodeBlockProps {
  code: string
  language: string
  filename: string
}

export default async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const isMermaid = language === 'mermaid'
  const isKifu = language === 'kifu'

  if (isMermaid) return <CodeBlockMermaid code={code} />

  if (isKifu) return <Kifu kifu={code} />

  const html = await highlighteCode(code, language)

  return (
    <div className={styles['code-block']}>
      <div className={styles['code-block-header']}>
        <div>
          <CodeBlockIcon language={language} />
        </div>
        <div className={styles['code-block-filename']}>{filename}</div>
        <div>
          <CodeBlockCopyButton code={code} />
        </div>
      </div>
      {html && <pre dangerouslySetInnerHTML={{ __html: html }} />}
      {!html && <pre>{code}</pre>}
    </div>
  )
}
