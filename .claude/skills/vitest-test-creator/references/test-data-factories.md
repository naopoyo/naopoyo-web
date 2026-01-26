# テストデータファクトリー

fisheryと@faker-js/fakerを使用した、再利用可能なテストデータの生成方法。複数のテストで一貫性のあるテストデータを効率的に管理できます。

## クイックスタート

### ファクトリーの基本

```typescript
// tests/factories/user.ts
import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'
import type { User } from '@/types'

export const userFactory = Factory.define<User>(() => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  createdAt: faker.date.past().toISOString(),
}))
```

### ファクトリーの使用

```typescript
// ユニットテスト
const user = userFactory.build() // デフォルト値で生成
const customUser = userFactory.build({ email: 'test@example.com' }) // 特定フィールドをオーバーライド
const users = userFactory.buildList(3) // 複数生成
```

---

## ファイル配置

ファクトリーファイルはプロジェクトルートの `tests/factories/` に集約して配置：

```text
tests/
└── factories/
    ├── user.ts          # ユーザーモデルのファクトリー
    ├── document.ts      # ドキュメントモデルのファクトリー
    └── index.ts         # 全ファクトリーをエクスポート（オプション）
```

### パスエイリアスの設定

`tsconfig.json` に `@tests` エイリアスを追加：

```json
{
  "compilerOptions": {
    "paths": {
      "@tests/*": ["./tests/*"]
    }
  }
}
```

テストファイルからのインポート：

```typescript
import { userFactory } from '@tests/factories/user'
```

---

## fisheryのベストプラクティス

### 1. ファクトリー関数の活用

複雑なオブジェクト生成にはファクトリー関数を使用：

```typescript
export const userFactory = Factory.define<User>(() => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  role: faker.helpers.arrayElement(['user', 'admin']),
  isActive: faker.datatype.boolean({ probability: 0.9 }),
}))
```

### 2. 関連データの構築

`afterBuild` フックで関連データを生成：

```typescript
export const postFactory = Factory.define<Post>(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  authorId: faker.string.uuid(),
  createdAt: faker.date.past().toISOString(),
})).afterBuild(async (post) => {
  // 関連のユーザーを自動生成する場合
  post.author = await userFactory.build()
})
```

### 3. ファクトリーの継承とカスタマイズ

基本ファクトリーから特殊なバリアントを作成：

```typescript
// 管理者ユーザーのファクトリー
export const adminUserFactory = userFactory.params({
  role: 'admin',
  isActive: true,
})

// 無効なユーザー
export const inactiveUserFactory = userFactory.params({
  isActive: false,
})
```

---

## @faker-js/fakerのベストプラクティス

### 1. ロケール設定

プロジェクトに合わせてロケールを選択：

```typescript
import { faker } from '@faker-js/faker'

// デフォルト（英語）
faker.internet.email() // john.doe@example.com

// ロケール固有の方法（各ロケール対応）
faker.person.fullName() // 言語別の名前生成
faker.address.country() // 言語別の国名
```

### 2. 現実的で多様なデータ生成

様々なfakerメソッドを使い分け：

```typescript
export const documentFactory = Factory.define<Document>(() => {
  const title = faker.lorem.sentence()

  return {
    id: faker.string.uuid(),
    slug: faker.helpers.slugify(title).toLowerCase(),
    title,
    emoji: faker.helpers.arrayElement(['📄', '📝', '📖', '✍️']),
    content: faker.lorem.paragraphs(3, '\n\n'),
    draft: faker.datatype.boolean({ probability: 0.2 }),
    publishedAt: faker.date.past({ years: 1 }).toISOString(),
    modifiedAt: faker.date.recent().toISOString(),
    tags: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => ({
      id: faker.string.uuid(),
      name: faker.lorem.word(),
    })),
  }
})
```

### 3. シード値を使った再現可能なテスト

同じシード値で同じデータを生成：

```typescript
// vitest.setup.ts または個別テスト内
import { faker } from '@faker-js/faker'

// シード値を固定（テストの再現性を確保）
faker.seed(12345)

const user1 = userFactory.build()
const user2 = userFactory.build()
// user1 と user2 は異なるデータだが再現可能
```

---

## テストでの使用例

### ユニットテスト

```typescript
// src/utils/__tests__/validate-user.unit.test.ts
import { describe, it, expect } from 'vitest'
import { validateUser } from '../validate-user'
import { userFactory } from '@tests/factories/user'

describe('validateUser', () => {
  it('有効なユーザーを検証する', () => {
    const user = userFactory.build()
    expect(validateUser(user)).toBe(true)
  })

  it('メールアドレスが無い場合は失敗する', () => {
    const user = userFactory.build({ email: '' })
    expect(validateUser(user)).toBe(false)
  })

  it('複数のユーザーを検証する', () => {
    const users = userFactory.buildList(5)
    users.forEach((user) => {
      expect(validateUser(user)).toBe(true)
    })
  })
})
```

### ブラウザテスト

```typescript
// src/components/__tests__/UserCard.browser.test.tsx
import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { UserCard } from '../UserCard'
import { userFactory } from '@tests/factories/user'

describe('UserCard', () => {
  afterEach(() => cleanup())

  const renderComponent = (overrides = {}) => {
    const user = userFactory.build(overrides)
    return render(<UserCard user={user} />)
  }

  it('ユーザー情報を表示する', () => {
    const { container } = renderComponent()
    expect(container.querySelector('[data-testid="user-name"]')).toBeInTheDocument()
  })

  it('カスタムユーザー名を表示する', () => {
    const { container } = renderComponent({ name: 'Custom User' })
    expect(container.querySelector('[data-testid="user-name"]')).toHaveTextContent('Custom User')
  })

  it('管理者ユーザーのバッジを表示する', () => {
    const { container } = renderComponent({ role: 'admin' })
    expect(container.querySelector('[data-testid="admin-badge"]')).toBeInTheDocument()
  })
})
```

---

## vitest設定

`optimizeDeps.include` に fishery と @faker-js/faker を追加して、ビルドを最適化：

```typescript
// vitest.config.mts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  optimizeDeps: {
    include: ['fishery', '@faker-js/faker'],
  },
  test: {
    // ... テスト設定
  },
})
```

---

## よくある失敗と解決方法

### ❌ ファクトリーで毎回異なるデータが生成される

データの一貫性が必要な場合は、シード値を使用：

```typescript
beforeEach(() => {
  faker.seed(42) // 各テストの前にシード値をリセット
})
```

### ❌ 複雑な関連データの生成が遅い

不要な関連データは生成しない：

```typescript
// 悪い例：全員に全関連データを生成
const users = userFactory.buildList(100)

// 良い例：必要なフィールドだけビルド
const users = userFactory.buildList(100, { id: faker.string.uuid() })
```

### ❌ ファクトリーがテストに含まれている

ファクトリーファイルはテスト実行対象から除外：

```typescript
// vitest.config.mts
export default defineConfig({
  test: {
    exclude: ['**/factories/**', 'node_modules'],
  },
})
```

---

## さらに詳しく

- [Fishery公式ドキュメント](https://github.com/thoughtbot/fishery)
- [@faker-js/faker公式ドキュメント](https://github.com/faker-js/faker)
