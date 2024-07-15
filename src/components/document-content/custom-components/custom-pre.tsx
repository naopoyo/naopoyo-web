import { Element, Text } from 'hast'
import { ExtraProps } from 'react-markdown'

import { CodeBlock } from '@/components/document-content/code-block'

export default function CustomPre({ children, node }: JSX.IntrinsicElements['pre'] & ExtraProps) {
  const childrenJsxElement = <>{children}</>

  if (!node) {
    return childrenJsxElement
  }

  const codeElement = node['children'][0] as Element

  if (codeElement['type'] !== 'element' || codeElement['tagName'] !== 'code') {
    return childrenJsxElement
  }

  const text = codeElement['children'][0] as Text

  if (text['type'] !== 'text') {
    return childrenJsxElement
  }

  const className = codeElement.properties.className as string
  const code = text.value

  const match = /language-(.+)/.exec(className || '')
  const tmpLanguage = match && match[1] ? (match[1] as string) : ''
  const [language, filename] = tmpLanguage.split(':')

  return <CodeBlock code={code} language={language} filename={filename} />
}
