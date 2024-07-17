import { Document } from '@hackersheet/core'
import {
  CodeBlock,
  Image,
  KifuTo,
  Link,
  LinkCard,
  XPost,
  Youtube,
} from '@hackersheet/next-document-content-components'
import { DocumentContent as OrgDocumentContent } from '@hackersheet/react-document-content'

import documentContentStyle from '@/styles/document-content.module.scss'
import 'katex/dist/katex.min.css'

export type DocumentContentProps = {
  document: Document
}

export function DocumentContent({ document }: DocumentContentProps) {
  return (
    <OrgDocumentContent
      document={document}
      style={documentContentStyle}
      permaLinkFormat="/docs/{{slug}}"
      components={{
        codeBlock: CodeBlock,
        image: Image,
        kifuTo: KifuTo,
        link: Link,
        linkCard: LinkCard,
        xPost: XPost,
        youtube: Youtube,
      }}
    />
  )
}
