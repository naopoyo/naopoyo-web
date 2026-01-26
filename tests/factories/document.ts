import { Factory } from 'fishery'

import type { Document } from '@hackersheet/core'

/**
 * Document型のテストデータを生成するファクトリー
 * 複数のテストで共有可能
 */
export const documentFactory = Factory.define<Document>(() => ({
  id: 'test-id-1',
  slug: 'test-document',
  emoji: '📄',
  title: 'Test Document',
  draft: false,
  content: 'This is test content',
  path: 'test-document.md',
  publishedAt: '2024-01-01T00:00:00Z',
  modifiedAt: '2024-01-02T00:00:00Z',
  tags: [],
  assets: [],
  outboundLinkDocuments: [],
  inboundLinkDocuments: [],
  websites: [],
}))
