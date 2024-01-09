import { Element, Text } from 'hast'
import { ExtraProps } from 'react-markdown'

import CodeBlock from './code-block'

export default function CustomPre({ children, node }: JSX.IntrinsicElements['pre'] & ExtraProps) {
  const childrenElm = <>{children}</>

  if (!node) {
    return childrenElm
  }

  const code = node['children'][0] as Element

  if (code['type'] !== 'element' || code['tagName'] !== 'code') {
    return childrenElm
  }

  const text = code['children'][0] as Text

  if (text['type'] !== 'text') {
    return childrenElm
  }

  const className = code.properties.className as string
  const codeValue = text.value as string

  const match = /language-(.+)/.exec(className || '')
  const tmpLanguage = match && match[1] ? (match[1] as string) : ''
  const [language, filename] = tmpLanguage.split(':')

  return <CodeBlock code={codeValue} language={language} filename={filename} />
}
