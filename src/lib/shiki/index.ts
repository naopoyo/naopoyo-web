import { cache } from 'react'
import { bundledLanguages, bundledThemes, getHighlighter } from 'shiki'

export async function highlighteCode(code: string, language: string) {
  const highlighter = await getShikiHighlighter()
  const shikiLang = Object.keys(bundledLanguages).find((lang) => lang === language)

  if (shikiLang === undefined) {
    return null
  }

  const html = highlighter.codeToHtml(code, {
    lang: shikiLang,
    theme: 'github-dark-dimmed',
  })

  return html
}

const getShikiHighlighter = cache(async () => {
  return getHighlighter({
    themes: Object.keys(bundledThemes),
    langs: Object.keys(bundledLanguages),
  })
})
