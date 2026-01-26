import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import { DocumentContent } from '../document-content'

interface MockDocumentProps {
  document: unknown
  style: unknown
  permaLinkFormat: string
  components: Record<string, unknown>
}

vi.mock('@hackersheet/react-document-content', () => ({
  DocumentContent: ({ document, style, permaLinkFormat, components }: MockDocumentProps) => (
    <div data-testid="document-content">
      <div data-testid="document-title">{document?.title || 'No title'}</div>
      <div data-testid="style">{style ? 'Style loaded' : 'No style'}</div>
      <div data-testid="permalink-format">{permaLinkFormat}</div>
      <div data-testid="components-count">{Object.keys(components).length}</div>
    </div>
  ),
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

  describe('基本動作', () => {
    it('ドキュメントを表示する', () => {
      const mockDocument = {
        title: 'Test Document',
      }

      const { container } = render(<DocumentContent document={mockDocument as unknown} />)
      expect(container.querySelector('[data-testid="document-content"]')).toBeInTheDocument()
    })

    it('ドキュメントのタイトルを表示する', () => {
      const mockDocument = {
        title: 'Test Document Title',
      }

      const { container } = render(<DocumentContent document={mockDocument as unknown} />)
      const titleElement = container.querySelector('[data-testid="document-title"]')
      expect(titleElement?.textContent).toBe('Test Document Title')
    })

    it('スタイルが読み込まれている', () => {
      const mockDocument = {
        title: 'Test Document',
      }

      const { container } = render(<DocumentContent document={mockDocument as unknown} />)
      const styleElement = container.querySelector('[data-testid="style"]')
      expect(styleElement?.textContent).toBe('Style loaded')
    })
  })

  describe('Props の設定', () => {
    it('パーマリンクフォーマットが正しく設定されている', () => {
      const mockDocument = {
        title: 'Test Document',
      }

      const { container } = render(<DocumentContent document={mockDocument as unknown} />)
      const permalinkElement = container.querySelector('[data-testid="permalink-format"]')
      expect(permalinkElement?.textContent).toBe('/docs/{{slug}}')
    })

    it('カスタムコンポーネントが設定されている', () => {
      const mockDocument = {
        title: 'Test Document',
      }

      const { container } = render(<DocumentContent document={mockDocument as unknown} />)
      const componentsCountElement = container.querySelector('[data-testid="components-count"]')
      expect(componentsCountElement?.textContent).toBe('12')
    })
  })

  describe('型チェック', () => {
    it('document prop を受け け取ることができる', () => {
      const mockDocument = {
        title: 'Type Test',
        content: 'Test content',
      }

      const { container } = render(<DocumentContent document={mockDocument as unknown} />)
      expect(container.querySelector('[data-testid="document-content"]')).toBeInTheDocument()
    })
  })
})
