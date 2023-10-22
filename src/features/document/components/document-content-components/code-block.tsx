import * as fs from 'fs/promises'
import { join as pathJoin } from 'path'

import React from 'react'
import { Highlighter, BUNDLED_LANGUAGES, getHighlighter, renderToHtml } from 'shiki'

import styles from '@/styles/document-content.module.scss'

import CodeBlockCopyButton from './code-block-copy-button'
import CodeBlockIcon from './code-block-icon'
import CodeBlockMermaid from './code-block-mermaid'

const getShikiPath = (): string => {
  return pathJoin(process.cwd(), 'src/shiki')
}

export interface CodeBlockProps {
  code: string
  language: string
  filename: string
}

const touched = { current: false }
let highlighterPromise: Promise<Highlighter> | null = null

const touchShikiPath = (): void => {
  if (touched.current) return
  fs.readdir(getShikiPath())
  touched.current = true
}

const getShikiHighlighter = async () => {
  if (highlighterPromise) {
    return highlighterPromise
  }

  touchShikiPath()

  highlighterPromise = getHighlighter({
    theme: 'github-dark-dimmed',
    paths: {
      languages: `${getShikiPath()}/languages/`,
      themes: `${getShikiPath()}/themes/`,
    },
  })

  return highlighterPromise
}

export default async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const highlighter = await getShikiHighlighter()
  const shikiLang = BUNDLED_LANGUAGES.find((lang) => lang.id === language)
  const tokens = shikiLang ? highlighter.codeToThemedTokens(code, shikiLang.id) : null
  const html =
    tokens &&
    renderToHtml(tokens, {
      elements: {
        pre({ children }) {
          return children
        },
      },
    })
  const isMermaid = language === 'mermaid'

  if (isMermaid) return <CodeBlockMermaid code={code} />

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
