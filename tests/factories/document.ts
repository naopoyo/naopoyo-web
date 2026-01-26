import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import type { Document, DocumentListItem } from '@hackersheet/core'

/**
 * DocumentListItem型のテストデータを生成するファクトリー
 * DocumentList配列の各要素用の軽量なドキュメント情報
 */
export const documentListItemFactory = Factory.define<DocumentListItem>(() => {
  const title = faker.lorem.sentence()
  const slug = faker.helpers.slugify(title).toLowerCase()
  const publishedAt = faker.date.past({ years: 1 }).toISOString()

  return {
    id: faker.string.uuid(),
    slug,
    emoji: faker.helpers.arrayElement(['📄', '📝', '📖', '📚', '✍️']),
    title,
    draft: faker.datatype.boolean({ probability: 0.2 }),
    path: `${slug}.md`,
    publishedAt,
    modifiedAt: publishedAt,
    tags: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      name: faker.lorem.word(),
    })),
    preview: null,
  }
})

/**
 * Document型のテストデータを生成するファクトリー
 * fakerを使用した現実的なテストデータを生成
 */
export const documentFactory = Factory.define<Document>(() => {
  const title = faker.lorem.sentence()
  const slug = faker.helpers.slugify(title).toLowerCase()
  const publishedAt = faker.date.past({ years: 1 }).toISOString()

  return {
    id: faker.string.uuid(),
    slug,
    emoji: faker.helpers.arrayElement(['📄', '📝', '📖', '📚', '✍️']),
    title,
    draft: faker.datatype.boolean({ probability: 0.2 }),
    content: faker.lorem.paragraphs(3, '\n\n'),
    path: `${slug}.md`,
    publishedAt,
    modifiedAt: publishedAt,
    tags: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      name: faker.lorem.word(),
    })),
    description: faker.lorem.sentence(),
    preview: null,
    assets: [],
    outboundLinkDocuments: [],
    inboundLinkDocuments: [],
    websites: [],
  }
})

/**
 * プレビュー画像付きのDocumentListItem
 */
export const documentListItemWithPreviewFactory = documentListItemFactory.params({
  preview: {
    id: faker.string.uuid(),
    fileUrl: faker.image.url(),
    width: 800,
    height: 600,
  },
})

/**
 * 複数のタグを持つDocumentListItem
 */
export const documentListItemWithTagsFactory = documentListItemFactory.params({
  tags: [
    { id: faker.string.uuid(), name: 'JavaScript' },
    { id: faker.string.uuid(), name: 'React' },
  ],
})

/**
 * プレビュー画像付きのドキュメント
 */
export const documentWithPreviewFactory = documentFactory.params({
  preview: {
    id: faker.string.uuid(),
    fileUrl: faker.image.url(),
    width: 800,
    height: 600,
  },
})

/**
 * 複数のタグを持つドキュメント
 */
export const documentWithTagsFactory = documentFactory.params({
  tags: [
    { id: faker.string.uuid(), name: 'JavaScript' },
    { id: faker.string.uuid(), name: 'React' },
  ],
})

/**
 * 更新日が異なるドキュメント
 */
export const documentWithModifiedDateFactory = documentFactory.params({
  modifiedAt: faker.date.recent().toISOString(),
})
