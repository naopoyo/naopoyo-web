import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import type { TagListItem } from '@hackersheet/core'

/**
 * TagListItem型のテストデータを生成するファクトリー
 * TagList配列の各要素用のタグ情報
 */
export const tagListItemFactory = Factory.define<TagListItem>(() => {
  const documentCountInPublished = faker.number.int({ min: 1, max: 50 })
  const documentCountInDraft = faker.number.int({ min: 0, max: 10 })

  return {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    documentCount: documentCountInPublished + documentCountInDraft,
    documentCountInPublished,
    documentCountInDraft,
  }
})

/**
 * 公開ドキュメントが0件のTagListItem
 * フィルタリングテスト用
 */
export const tagListItemWithZeroPublishedFactory = tagListItemFactory.params({
  documentCountInPublished: 0,
  documentCount: 0,
  documentCountInDraft: 0,
})

/**
 * 特定の名前を持つTagListItem
 * 名前でのテスト用
 */
export const tagListItemWithNameFactory = (name: string) =>
  tagListItemFactory.params({
    name,
  })
