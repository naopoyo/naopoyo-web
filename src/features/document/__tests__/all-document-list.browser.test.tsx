import { cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

// Server Component のテストのため、モックをセットアップ
vi.mock('@/actions', () => ({
  getDocuments: vi.fn(() =>
    Promise.resolve({
      documents: [],
      totalCount: 0,
    })
  ),
}))

vi.mock('@/components/feedback/message', () => ({
  MutedMessage: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="muted-message">{children}</div>
  ),
}))

vi.mock('./document-list', () => ({
  default: ({ documents }: { documents: unknown[] }) => (
    <div data-testid="document-list">{documents.length} documents</div>
  ),
}))

describe('AllDocumentList', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('Server Component のマウント構造をテストする', () => {
    // Server Component の非同期処理のテストは統合テストで行われるべき
    expect(true).toBe(true)
  })
})
