import shiki, { BUNDLED_LANGUAGES } from 'shiki'

export interface CodeBlockProps {
  code: string
  language: string
  filename: string
}

export default async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const highlighter = await shiki.getHighlighter({
    theme: 'github-dark-dimmed',
  })

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
