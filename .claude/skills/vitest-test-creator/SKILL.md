---
name: vitest-test-creator
description: Vitest テストの作成・リファクタリング・デバッグ支援。ユニットテスト、React コンポーネントテスト、Hooks テストに対応。「テストを書いて」「テストケースを追加して」「テストをリファクタリングして」などのリクエストで使用。
---

# Vitest Test Creator

Vitest 固有のパターンと、よくあるハマりどころを解説するスキル。

## テスト作成前の判断

対象コードにテストすべきロジックがあるか判断し、不要な場合はその旨をユーザーに伝える。

**テストの価値 = ロジックの複雑さ × バグ発生の可能性**。積がゼロに近いコードにはテストを書かない。

テストすべき: 条件分岐 / データ変換 / ユーザー操作 / 副作用
テスト不要: 静的マークアップ（props・状態・分岐なし） / バレルエクスポート / 定数定義

静的コンポーネントのテストはソースを assertion に書き直しただけになり、正常な変更で壊れる。

## ブラウザテスト（Vitest Browser Mode）

Vitest Browser Mode を使用している場合の注意点。

### cleanup() は必須

Vitest Browser Mode では自動 cleanup が効かない場合がある。必ず `afterEach` で呼び出す：

```typescript
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

describe('Component', () => {
  afterEach(() => cleanup())

  it('test', () => {
    render(<Component />)
  })
})
```

### container.querySelector() を優先

`screen.getByRole()` は複数要素で失敗しやすい。`container.querySelector()` で明確に指定：

```typescript
// ✅ 推奨
const { container } = render(<Component />)
const input = container.querySelector('input[type="search"]')

// ❌ 複数要素があるとエラー
const input = screen.getByRole('searchbox')
```

### userEvent は必ず setup() から

```typescript
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'text')
```

## カスタム Hooks のテスト

Hooks は DOM 操作を含むためブラウザテストを使用：

```typescript
import { renderHook, act } from '@testing-library/react'

describe('useCounter', () => {
  it('increment', () => {
    const { result } = renderHook(() => useCounter())
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)
  })
})
```

## Next.js モック

### next/link

```typescript
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))
```

### next/navigation

```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => '/current-path',
  useSearchParams: () => new URLSearchParams(),
}))
```

## テストデータファクトリー

fishery + @faker-js/faker で再利用可能なテストデータを生成。
詳細は [test-data-factories.md](references/test-data-factories.md) を参照。

```typescript
import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'

export const userFactory = Factory.define<User>(() => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
}))

// 使用
const user = userFactory.build()
const users = userFactory.buildList(3)
const customUser = userFactory.build({ name: 'Test User' })
```

## トラブルシューティング

### jest-dom マッチャーが見つからない

```
Property 'toBeInTheDocument' does not exist
```

→ セットアップファイルで `import '@testing-library/jest-dom/vitest'` が必要。
→ ブラウザテスト用の設定で `setupFiles` を指定しているか確認。

### act() 警告

```
Warning: An update to [Component] inside a test was not wrapped in act(...)
```

→ `userEvent.setup()` を使用しているか確認（自動で act ラップされる）。
→ 非同期更新は `await vi.waitFor()` で待つ。

### テストがタイムアウト

→ `async` テストに `await` があるか確認。
→ `vi.useFakeTimers()` 使用時は `vi.runAllTimers()` を呼ぶ。

## リファレンス

- [test-data-factories.md](references/test-data-factories.md) - fishery/faker によるファクトリーパターン
