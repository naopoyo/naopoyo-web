import { Document } from '@hackersheet/core'
import {
  CodeBlock,
  DirectoryTree,
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

/**
 * DocumentContent の Props 型
 */
export type DocumentContentProps = {
  document: Document
}

/**
 * ドキュメント内容をレンダリングするカスタムコンポーネントマップ
 * @internal
 */
const DOCUMENT_COMPONENTS = {
  codeBlock: CodeBlock,
  directoryTree: DirectoryTree,
  gist: Gist,
  heading: Heading,
  image: Image,
  link: Link,
  kifu: Kifu,
  kifuTo: KifuTo,
  linkCard: LinkCard,
  mermaid: Mermaid,
  xPost: XPost,
  youtube: Youtube,
} as const

/**
 * DocumentContent
 *
 * Hackersheet のドキュメント内容をレンダリングするコンポーネント。
 * カスタムコンポーネントマップを使用して、各要素タイプの表示をカスタマイズしています。
 *
 * @param props ドキュメント内容を含む Props
 * @returns レンダリングされたドキュメントコンテンツ
 */
export function DocumentContent({ document }: DocumentContentProps) {
  return (
    <BaseDocumentContent
      document={document}
      style={documentContentStyle}
      permaLinkFormat="/docs/{{slug}}"
      components={DOCUMENT_COMPONENTS}
    />
  )
}
