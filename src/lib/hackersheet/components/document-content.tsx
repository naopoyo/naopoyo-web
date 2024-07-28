import { Document } from '@hackersheet/core'
import {
  CodeBlock,
  Gist,
  Heading,
  Image,
  Link,
  LinkCard,
  Mermaid,
  XPost,
  Youtube,
} from '@hackersheet/next-document-content-components'
import { Kifu, KifuTo } from '@hackersheet/next-document-content-kifu'
import { DocumentContent as BaseDocumentContent } from '@hackersheet/react-document-content'

import { documentContentStyle } from '../../hackersheet/style'

import 'katex/dist/katex.min.css'
import '@hackersheet/react-document-content-styles/gist-theme'

export type DocumentContentProps = {
  document: Document
}

export function DocumentContent({ document }: DocumentContentProps) {
  return (
    <BaseDocumentContent
      document={document}
      style={documentContentStyle}
      permaLinkFormat="/docs/{{slug}}"
      components={{
        codeBlock: CodeBlock,
        gist: Gist,
        heading: Heading,
        image: Image,
        kifu: Kifu,
        kifuTo: KifuTo,
        link: Link,
        linkCard: LinkCard,
        mermaid: Mermaid,
        xPost: XPost,
        youtube: Youtube,
      }}
    />
  )
}
