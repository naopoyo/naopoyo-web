import { render, cleanup } from '@testing-library/react'
import { documentFactory } from '@tests/factories/document'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { DocumentContent } from '../document-content'

interface MockDocumentProps {
  document: unknown
  style: unknown
  permaLinkFormat: string
  components: Record<string, unknown>
}

vi.mock('@hackersheet/react-document-content', () => ({
  DocumentContent: function MockDocumentContent({
    document,
    style,
    permaLinkFormat,
    components,
  }: MockDocumentProps) {
    const doc = document as Record<string, unknown> | null | undefined
    const title = (doc?.title as string) || 'No title'
    return (
      <div data-testid="document-content">
        <div data-testid="document-title">{title}</div>
        <div data-testid="style">{style ? 'Style loaded' : 'No style'}</div>
        <div data-testid="permalink-format">{permaLinkFormat}</div>
        <div data-testid="components-count">{Object.keys(components).length}</div>
      </div>
    )
  },
}))

vi.mock('@hackersheet/next-document-content-components', () => ({
  CodeBlock: () => <div>CodeBlock</div>,
  DirectoryTree: () => <div>DirectoryTree</div>,
  Gist: () => <div>Gist</div>,
  Heading: () => <div>Heading</div>,
  Image: () => <div>Image</div>,
  Link: () => <div>Link</div>,
  LinkCard: () => <div>LinkCard</div>,
  Mermaid: () => <div>Mermaid</div>,
  XPost: () => <div>XPost</div>,
  Youtube: () => <div>Youtube</div>,
}))

vi.mock('@hackersheet/next-document-content-kifu', () => ({
  Kifu: () => <div>Kifu</div>,
  KifuTo: () => <div>KifuTo</div>,
}))

vi.mock('../../hackersheet/style', () => ({
  documentContentStyle: {
    container: 'container-class',
  },
}))

describe('DocumentContent', () => {
  afterEach(() => cleanup())

  /**
   * テスト対象コンポーネントをレンダリングするヘルパー関数
   */
  const renderComponent = (overrides = {}) => {
    const document = documentFactory.build(overrides)
    return render(<DocumentContent document={document} />)
  }

  describe('基本動作', () => {
    it('ドキュメントを表示する', () => {
      const { container } = renderComponent()
      expect(container.querySelector('[data-testid="document-content"]')).toBeInTheDocument()
    })

    it('ドキュメントのタイトルを表示する', () => {
      const { container } = renderComponent({ title: 'Custom Document Title' })
      const titleElement = container.querySelector('[data-testid="document-title"]')
      expect(titleElement).toHaveTextContent('Custom Document Title')
    })

    it('スタイルが読み込まれている', () => {
      const { container } = renderComponent()
      const styleElement = container.querySelector('[data-testid="style"]')
      expect(styleElement).toHaveTextContent('Style loaded')
    })
  })

  describe('Props の設定', () => {
    it('パーマリンクフォーマットが正しく設定されている', () => {
      const { container } = renderComponent()
      const permalinkElement = container.querySelector('[data-testid="permalink-format"]')
      expect(permalinkElement).toHaveTextContent('/docs/{{slug}}')
    })

    it('カスタムコンポーネントが設定されている', () => {
      const { container } = renderComponent()
      const componentsCountElement = container.querySelector('[data-testid="components-count"]')
      expect(componentsCountElement).toHaveTextContent('12')
    })
  })

  describe('型チェック', () => {
    it('document prop を受け取ることができる', () => {
      const { container } = renderComponent({ content: 'Custom test content' })
      expect(container.querySelector('[data-testid="document-content"]')).toBeInTheDocument()
    })
  })
})
