import * as fs from 'fs/promises'
import { join as pathJoin } from 'path'

import { Highlighter, BUNDLED_LANGUAGES, getHighlighter, renderToHtml } from 'shiki'

import CodeBlockCopyButton from './code-block-copy-button'

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
  const showFilename = !!filename
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

  return (
    /* eslint-disable tailwindcss/no-custom-classname */
    <div className='code-block'>
      <div className='code-block-header'>
        <div className='code-block-filename'>{showFilename ? filename : language}</div>
        <div className='code-block-copy-button-wrapper'>
          <CodeBlockCopyButton code={code} />
        </div>
      </div>
      {html && <pre dangerouslySetInnerHTML={{ __html: html }} />}
      {!html && <pre>{code}</pre>}
    </div>
  )
}
