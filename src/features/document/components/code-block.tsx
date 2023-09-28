import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import { atomDark as style } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <SyntaxHighlighter style={style} language={language} PreTag='pre'>
      {code}
    </SyntaxHighlighter>
  )
}
