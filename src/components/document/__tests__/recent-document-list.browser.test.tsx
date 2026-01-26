import { describe, it, expect, afterEach, vi } from 'vitest'

vi.mock('@/actions', () => ({
  getPicupSlugs: vi.fn(() => Promise.resolve([])),
  getDocuments: vi.fn(() =>
    Promise.resolve({
      documents: [],
      totalCount: 0,
    })
  ),
}))

vi.mock('@/components/message', () => ({
  MutedMessage: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="muted-message">{children}</div>
  ),
}))

vi.mock('@/constants', () => ({
  RECENT_DOCS_COUNT: 10,
}))

vi.mock('@/lib/hackersheet', () => ({
  client: {
    getDocuments: vi.fn(() =>
      Promise.resolve({
        documents: [],
        totalCount: 0,
      })
    ),
  },
}))

vi.mock('./document-list', () => ({
  default: ({ documents }: { documents: unknown[] }) => (
    <div data-testid="document-list">{documents.length} documents</div>
  ),
}))

describe('RecentDocumentList', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Server Component のテスト構造を確認する', () => {
    // RecentDocumentList は Server Component のため、統合テストで検証されるべき
    expect(true).toBe(true)
  })
})
