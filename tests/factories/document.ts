import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import type { Document } from '@hackersheet/core'

/**
 * Document型のテストデータを生成するファクトリー
 * fakerを使用した現実的なテストデータを生成
 */
export const documentFactory = Factory.define<Document>(() => {
  const title = faker.lorem.sentence()
  const slug = faker.helpers.slugify(title).toLowerCase()

  return {
    id: faker.string.uuid(),
    slug,
    emoji: faker.helpers.arrayElement(['📄', '📝', '📖', '📚', '✍️']),
    title,
    draft: faker.datatype.boolean({ probability: 0.2 }),
    content: faker.lorem.paragraphs(3, '\n\n'),
    path: `${slug}.md`,
    publishedAt: faker.date.past({ years: 1 }).toISOString(),
    modifiedAt: faker.date.recent().toISOString(),
    tags: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      name: faker.lorem.word(),
    })),
    assets: [],
    outboundLinkDocuments: [],
    inboundLinkDocuments: [],
    websites: [],
  }
})
