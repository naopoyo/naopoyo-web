import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import AllDocumentList from '../all-document-list'

// getDocumentsアクションをモック
vi.mock('@/actions', () => ({
  getDocuments: vi.fn(),
}))

// MutedMessageコンポーネントをモック
vi.mock('@/components/message', () => ({
  MutedMessage: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// DocumentListコンポーネントをモック
vi.mock('../document-list', () => ({
  default: ({ documents }: { documents: Array<{ id: string; title: string }> }) => (
    <ul>
      {documents.map((doc) => (
        <li key={doc.id}>{doc.title}</li>
      ))}
    </ul>
  ),
}))

describe('AllDocumentList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('ドキュメント一覧を表示する', async () => {
    const { getDocuments } = await import('@/actions')
    const mockDocuments = [
      {
        id: '1',
        slug: 'document-1',
        title: 'Document 1',
        emoji: '📄',
        draft: false,
        publishedAt: '2024-01-01T00:00:00Z',
        modifiedAt: '2024-01-01T00:00:00Z',
        preview: null,
        tags: [],
      },
      {
        id: '2',
        slug: 'document-2',
        title: 'Document 2',
        emoji: '📝',
        draft: false,
        publishedAt: '2024-01-02T00:00:00Z',
        modifiedAt: '2024-01-02T00:00:00Z',
        preview: null,
        tags: [],
      },
    ]
    vi.mocked(getDocuments).mockResolvedValueOnce({
      documents: mockDocuments,
      totalCount: 2,
      isEmpty: false,
      error: undefined,
    })

    const { container } = render(await AllDocumentList({}))
    const listItems = container.querySelectorAll('li')

    expect(listItems).toHaveLength(2)
    expect(listItems[0].textContent).toContain('Document 1')
    expect(listItems[1].textContent).toContain('Document 2')
  })

  it('検索結果がない場合はメッセージを表示する', async () => {
    const { getDocuments } = await import('@/actions')
    vi.mocked(getDocuments).mockResolvedValueOnce({
      documents: [],
      totalCount: 0,
      isEmpty: true,
      error: undefined,
    })

    const { container } = render(await AllDocumentList({}))

    expect(container.textContent).toContain('検索結果がありませんでした。')
  })

  it('keywordパラメータをgetDocumentsに渡す', async () => {
    const { getDocuments } = await import('@/actions')
    vi.mocked(getDocuments).mockResolvedValueOnce({
      documents: [],
      totalCount: 0,
      isEmpty: true,
      error: undefined,
    })

    await AllDocumentList({ keyword: 'test' })

    expect(getDocuments).toHaveBeenCalledWith({
      keyword: 'test',
      sortBy: 'published_at',
    })
  })

  it('sortByパラメータをgetDocumentsに渡す', async () => {
    const { getDocuments } = await import('@/actions')
    vi.mocked(getDocuments).mockResolvedValueOnce({
      documents: [],
      totalCount: 0,
      isEmpty: true,
      error: undefined,
    })

    await AllDocumentList({ keyword: 'test', sortBy: 'created_at' })

    expect(getDocuments).toHaveBeenCalledWith({
      keyword: 'test',
      sortBy: 'created_at',
    })
  })

  it('sortByのデフォルト値はpublished_atである', async () => {
    const { getDocuments } = await import('@/actions')
    vi.mocked(getDocuments).mockResolvedValueOnce({
      documents: [],
      totalCount: 0,
      isEmpty: true,
      error: undefined,
    })

    await AllDocumentList({ keyword: 'test' })

    expect(getDocuments).toHaveBeenCalledWith({
      keyword: 'test',
      sortBy: 'published_at',
    })
  })

  it('複数のドキュメントを表示する', async () => {
    const { getDocuments } = await import('@/actions')
    const mockDocuments = Array.from({ length: 5 }, (_, i) => ({
      id: String(i + 1),
      slug: `document-${i + 1}`,
      title: `Document ${i + 1}`,
      emoji: '📄',
      draft: false,
      publishedAt: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
      modifiedAt: `2024-01-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
      preview: null,
      tags: [],
    }))
    vi.mocked(getDocuments).mockResolvedValueOnce({
      documents: mockDocuments,
      totalCount: 5,
      isEmpty: false,
      error: undefined,
    })

    const { container } = render(await AllDocumentList({}))
    const listItems = container.querySelectorAll('li')

    expect(listItems).toHaveLength(5)
  })
})
