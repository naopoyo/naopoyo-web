import { Document } from '@hackersheet/core'
import {
  CodeBlock,
  Image,
  Link,
  LinkCard,
  Mermaid,
  XPost,
  Youtube,
} from '@hackersheet/next-document-content-components'
import { Kifu, KifuTo } from '@hackersheet/next-document-content-kifu'
import { DocumentContent as BaseDocumentContent } from '@hackersheet/react-document-content'
import documentContentStyle from '@hackersheet/react-document-content-styles/basic'

import 'katex/dist/katex.min.css'

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
