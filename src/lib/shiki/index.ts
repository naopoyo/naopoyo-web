import * as fs from 'fs/promises'
import { join as pathJoin } from 'path'

import { BUNDLED_LANGUAGES, Highlighter, getHighlighter, renderToHtml } from 'shiki'

const SHIKI_BASE_PATH = 'src/lib/shiki'
const touched = { current: false }
let highlighterPromise: Promise<Highlighter> | null = null

export async function highlighteCode(code: string, language: string) {
  const highlighter = await getShikiHighlighter()
  const shikiLang = BUNDLED_LANGUAGES.find((lang) => lang.id === language)
  const tokens = shikiLang ? highlighter.codeToThemedTokens(code, shikiLang.id) : undefined
  const html =
    tokens &&
    renderToHtml(tokens, {
      elements: {
        pre({ children }) {
          return children
        },
      },
    })

  return html
}

function touchShikiPath(): void {
  if (touched.current) return
  fs.readdir(getShikiPath())
  touched.current = true
}

function getShikiPath(): string {
  return pathJoin(process.cwd(), SHIKI_BASE_PATH)
}

async function getShikiHighlighter() {
  if (highlighterPromise !== null) {
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
