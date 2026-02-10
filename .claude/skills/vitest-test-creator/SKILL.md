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

`screen.getByRole()` は複数要素で失敗しやすい。`container.querySelector()` で明確に指定。
セレクタは HTML セマンティクス（`a[href]`, `input[type]`）を使い、モックに `data-testid` を埋め込まない：

```typescript
// ✅ 推奨
const { container } = render(<Component />)
const input = container.querySelector('input[type="search"]')
const link = container.querySelector('a[href*="github.com"]')

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

## モック共通化

同一実装が 3 箇所以上あり、かつモック対象の API 変更で複数修正が必要な場合に共通化する。
値やエクスポートがテストごとに異なるモック（`@/env` 等）はインラインのまま残す。

### サードパーティライブラリ → `setupFiles` でグローバル登録

`vitest.setup.tsx` に定義。全ブラウザテストに自動適用されるため、テストファイルでの `vi.mock` は不要：

```typescript
// vitest.setup.tsx に next/link モックを定義済み
// テストファイルでは何も書かなくてよい
```

### ソースモジュール → 短縮インラインモック

パスエイリアス（`@/`）では `__mocks__` ディレクトリが解決されない（Vitest の既知の制限）。ファクトリ付きで記述：

```typescript
vi.mock('@/components/navigations/link', () => ({
  NextLink: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a href={href}>{children}</a>
  ),
}))
```

## Next.js モック

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
