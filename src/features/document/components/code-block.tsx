import * as fs from 'fs/promises'
import { join as pathJoin } from 'path'

import shiki, { BUNDLED_LANGUAGES } from 'shiki'

const getShikiPath = (): string => {
  return pathJoin(process.cwd(), 'src/shiki')
}

export interface CodeBlockProps {
  code: string
  language: string
  filename: string
}

const touched = { current: false }

const touchShikiPath = (): void => {
  if (touched.current) return
  fs.readdir(getShikiPath())
  touched.current = true
}

let highlighter: shiki.Highlighter | null = null

export default async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  if (highlighter === null) {
    touchShikiPath()

    highlighter = await shiki.getHighlighter({
      theme: 'github-dark-dimmed',
      paths: {
        languages: `${getShikiPath()}/languages/`,
        themes: `${getShikiPath()}/themes/`,
      },
    })
  }

  const showFilename = !!filename
  const shikiLang = BUNDLED_LANGUAGES.find((lang) => lang.id === language)
  const tokens = shikiLang ? highlighter.codeToThemedTokens(code, shikiLang.id) : null
  const html =
    tokens &&
    shiki.renderToHtml(tokens, {
      elements: {
        pre({ children }) {
          return children
        },
      },
    })

  return (
    <div className='code-block'>
      {showFilename && <div className='code-block-header'>{filename}</div>}
      {html && <pre dangerouslySetInnerHTML={{ __html: html }} />}
      {!html && <pre>{code}</pre>}
    </div>
  )
}
