import { cache } from 'react'
import { BUNDLED_LANGUAGES, getHighlighter, renderToHtml } from 'shiki'

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

const getShikiHighlighter = cache(async () => {
  return getHighlighter({
    theme: 'github-dark-dimmed',
  })
})
