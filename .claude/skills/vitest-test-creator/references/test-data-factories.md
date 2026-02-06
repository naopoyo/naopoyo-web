# テストデータファクトリー

fishery と @faker-js/faker を使用したテストデータ生成パターン。

## 基本パターン

```typescript
import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'

export const userFactory = Factory.define<User>(() => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  createdAt: faker.date.past().toISOString(),
}))
```

## 使用方法

```typescript
const user = userFactory.build()                    // デフォルト値
const custom = userFactory.build({ name: 'Test' })  // オーバーライド
const users = userFactory.buildList(3)              // 複数生成
```

## バリアント

```typescript
export const adminFactory = userFactory.params({
  role: 'admin',
  isActive: true,
})

export const inactiveFactory = userFactory.params({
  isActive: false,
})
```

## 関連データ

```typescript
export const postFactory = Factory.define<Post>(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  authorId: faker.string.uuid(),
})).afterBuild((post) => {
  post.author = userFactory.build({ id: post.authorId })
})
```

## シード固定

再現可能なテストには `faker.seed()` を使用：

```typescript
beforeEach(() => {
  faker.seed(42)
})
```

## よく使う faker メソッド

```typescript
faker.string.uuid()                                    // UUID
faker.internet.email()                                 // メールアドレス
faker.person.fullName()                                // フルネーム
faker.lorem.sentence()                                 // 1文
faker.lorem.paragraphs(3)                              // 段落
faker.date.past()                                      // 過去の日付
faker.date.recent()                                    // 最近の日付
faker.number.int({ min: 1, max: 100 })                 // 整数
faker.datatype.boolean({ probability: 0.9 })           // 確率指定
faker.helpers.arrayElement(['a', 'b', 'c'])            // 配列からランダム
faker.helpers.slugify(title)                           // スラッグ化
```
