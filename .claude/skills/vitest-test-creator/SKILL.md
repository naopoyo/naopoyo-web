---
name: vitest-test-creator
description: Vitestを使用したテストコード作成・リファクタリングスキル。関数のユニットテスト、Reactコンポーネントテスト、APIハンドラのテストに対応。「テストを書いて」「テストを作成して」「〇〇のテストケースを追加して」などのリクエストで使用。また「テストをリファクタリングして」「テストコードを整理して」「このテストをガイドラインに沿って修正して」などのリファクタリングリクエストにも対応。.test.ts/.test.tsxファイルの作成・編集・改善時に活用。
---

# Vitest Test Creator

Vitestを使用したテストコード作成のガイド。

## テストファイルの配置

```
src/
├── utils/
│   ├── __tests__/
│   │   └── format.test.ts   # __tests__ディレクトリに配置
│   └── format.ts
├── components/
│   ├── __tests__/
│   │   └── Button.test.tsx
│   └── Button.tsx
```

- テストファイルは対象ファイルと同じ階層に`__tests__`ディレクトリを作成して配置
- ファイル名は`対象ファイル名.test.ts`または`対象ファイル名.test.tsx`

## 基本構造

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('対象の名前', () => {
  beforeEach(() => {
    // 各テスト前のセットアップ
  })

  afterEach(() => {
    // 各テスト後のクリーンアップ
  })

  it('期待する動作を説明', () => {
    // Arrange
    const input = 'test'

    // Act
    const result = targetFunction(input)

    // Assert
    expect(result).toBe('expected')
  })
})
```

## テストの命名規則

- `describe`: 対象の関数名/コンポーネント名/クラス名
- `it`: 「〜する」「〜を返す」「〜をスローする」など動作を記述

```typescript
describe('formatDate', () => {
  it('ISO形式の日付を日本語形式に変換する', () => {})
  it('無効な日付でエラーをスローする', () => {})
})
```

## アサーション

```typescript
// 等価性
expect(value).toBe(expected)           // 厳密等価 (===)
expect(value).toEqual(expected)        // 深い等価（オブジェクト/配列）
expect(value).toStrictEqual(expected)  // undefinedプロパティも含めて比較

// 真偽値
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()

// 数値
expect(value).toBeGreaterThan(3)
expect(value).toBeLessThanOrEqual(5)
expect(value).toBeCloseTo(0.3, 5)  // 浮動小数点

// 文字列
expect(value).toMatch(/pattern/)
expect(value).toContain('substring')

// 配列/オブジェクト
expect(array).toContain(item)
expect(array).toHaveLength(3)
expect(object).toHaveProperty('key', value)

// 例外
expect(() => fn()).toThrow()
expect(() => fn()).toThrow('message')
expect(() => fn()).toThrow(ErrorClass)

// 非同期
await expect(asyncFn()).resolves.toBe(value)
await expect(asyncFn()).rejects.toThrow()
```

## テストタイプ別ガイド

### 関数のユニットテスト

```typescript
import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculate'

describe('calculateTotal', () => {
  it('商品の合計金額を計算する', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 200, quantity: 1 },
    ]
    expect(calculateTotal(items)).toBe(400)
  })

  it('空配列で0を返す', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('負の数量でエラーをスローする', () => {
    const items = [{ price: 100, quantity: -1 }]
    expect(() => calculateTotal(items)).toThrow('Invalid quantity')
  })
})
```

### Reactコンポーネントテスト

詳細は [references/react-testing.md](references/react-testing.md) を参照。

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('ラベルを表示する', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('クリックでonClickを呼び出す', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('disabled時はクリックできない', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Click</Button>)

    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
```

### モック

詳細は [references/mocking.md](references/mocking.md) を参照。

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest'

// 関数モック
const mockFn = vi.fn()
mockFn.mockReturnValue('value')
mockFn.mockResolvedValue('async value')
mockFn.mockImplementation((x) => x * 2)

// モジュールモック
vi.mock('./api', () => ({
  fetchUser: vi.fn(),
}))

// スパイ
const spy = vi.spyOn(object, 'method')

// リセット
beforeEach(() => {
  vi.clearAllMocks()  // 呼び出し履歴をクリア
})
```

### 非同期テスト

```typescript
describe('fetchData', () => {
  it('データを取得する', async () => {
    const data = await fetchData()
    expect(data).toEqual({ id: 1, name: 'Test' })
  })

  it('エラー時に例外をスローする', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))
    await expect(fetchData()).rejects.toThrow('Network error')
  })
})
```

## ベストプラクティス

1. **1テスト1アサーション**: 1つのテストでは1つの振る舞いを検証
2. **AAA パターン**: Arrange（準備）→ Act（実行）→ Assert（検証）
3. **実装ではなく振る舞いをテスト**: 内部実装に依存しない
4. **テストデータの独立性**: 各テストは他のテストに依存しない
5. **エッジケースをカバー**: 空配列、null、境界値など
6. **モックは最小限に**: 必要な依存のみモック化

## テストのリファクタリング

既存のテストコードをガイドラインに沿って改善する際のチェックリスト：

### 構造の改善

- [ ] `describe`で対象ごとにグループ化されているか
- [ ] `it`の説明が動作を明確に記述しているか
- [ ] AAAパターン（Arrange/Act/Assert）に沿っているか
- [ ] 各テストが独立しているか（順序依存がないか）

### 命名の改善

```typescript
// Bad
it('test1', () => {})
it('should work', () => {})

// Good
it('空配列で0を返す', () => {})
it('無効な入力でエラーをスローする', () => {})
```

### アサーションの改善

```typescript
// Bad: 曖昧なアサーション
expect(result).toBeTruthy()

// Good: 具体的なアサーション
expect(result).toBe('expected value')
expect(result).toEqual({ id: 1, name: 'Test' })
```

### モックの改善

```typescript
// Bad: グローバルなモック状態
vi.mock('./api')

// Good: テストごとにクリア
beforeEach(() => {
  vi.clearAllMocks()
})
```

### 重複の削除

```typescript
// Bad: 重複したセットアップ
it('test1', () => {
  const user = { id: 1, name: 'Taro' }
  // ...
})
it('test2', () => {
  const user = { id: 1, name: 'Taro' }
  // ...
})

// Good: beforeEachで共通化
describe('UserService', () => {
  let user: User

  beforeEach(() => {
    user = { id: 1, name: 'Taro' }
  })

  it('test1', () => { /* ... */ })
  it('test2', () => { /* ... */ })
})
```
