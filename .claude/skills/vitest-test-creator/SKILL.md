---
name: vitest-test-creator
description: Vitestを使用したテストコード作成・リファクタリングスキル。関数のユニットテスト、Reactコンポーネントテスト、APIハンドラのテストに対応。「テストを書いて」「テストを作成して」「〇〇のテストケースを追加して」などのリクエストで使用。また「テストをリファクタリングして」「テストコードを整理して」「このテストをガイドラインに沿って修正して」などのリファクタリングリクエストにも対応。.test.ts/.test.tsxファイルの作成・編集・改善時に活用。
---

# Vitest Test Creator

Vitestを使用したテストコード作成のガイド。

## テストファイルの配置と命名規則

### ファイル配置

```text
src/
├── utils/
│   ├── __tests__/
│   │   └── create-date-format.unit.test.ts   # ユニットテスト
│   └── create-date-format.ts
├── lib/
│   ├── __tests__/
│   │   └── string-to-color.unit.test.ts      # ユニットテスト
│   └── string-to-color.ts
├── components/
│   ├── theme-switcher/
│   │   ├── __tests__/
│   │   │   └── theme-switcher.browser.test.tsx  # ブラウザテスト
│   │   └── theme-switcher.tsx
│   └── Button/
│       ├── __tests__/
│       │   └── Button.browser.test.tsx        # ブラウザテスト
│       └── Button.tsx
└── hooks/
    ├── __tests__/
    │   └── useTheme.browser.test.ts           # ブラウザテスト（hooks）
    └── useTheme.ts
```

- テストファイルは対象ファイルと同じ階層に`__tests__`ディレクトリを作成して配置

### テストファイルの命名規則

**ファイル名の形式：** `対象ファイル名.{unit|browser}.{test|spec}.{ts|tsx}`

| テストタイプ       | ファイルパターン     | 実行環境              | 対象                                 | 例                                |
| ------------------ | -------------------- | --------------------- | ------------------------------------ | --------------------------------- |
| **ユニットテスト** | `*.unit.test.ts`     | Node.js               | 純粋なロジック関数、ユーティリティ   | `create-date-format.unit.test.ts` |
| **ブラウザテスト** | `*.browser.test.tsx` | Playwright (Chromium) | React コンポーネント、カスタム hooks | `theme-switcher.browser.test.tsx` |

### どのテストタイプを使い分けるか

#### ✅ ユニットテスト（`.unit.test.ts`）を使う

テスト対象が以下の場合：

- **ディレクトリ：** `utils/`, `lib/`, `constants/` 内のファイル
- **内容：** 純粋な関数、ロジック処理、計算、フォーマット
- **例：**
  - `utils/create-date-format.ts` → `create-date-format.unit.test.ts`
  - `lib/string-to-color.ts` → `string-to-color.unit.test.ts`
  - `utils/get-favicon-url.ts` → `get-favicon-url.unit.test.ts`

```typescript
// ユニットテストの例
import { describe, it, expect } from 'vitest'
import { createDateFormat } from './create-date-format'

describe('createDateFormat', () => {
  it('ISO形式の日付を日本語形式に変換する', () => {
    const result = createDateFormat('2024-01-15')
    expect(result).toBe('2024年1月15日')
  })
})
```

#### ✅ ブラウザテスト（`.browser.test.tsx`）を使う

テスト対象が以下の場合：

- **ディレクトリ：** `components/`, `hooks/` 内のファイル
- **内容：** React コンポーネント、カスタム hooks（DOM 操作を含む）
- **例：**
  - `components/theme-switcher/theme-switcher.tsx` → `theme-switcher.browser.test.tsx`
  - `components/Button/Button.tsx` → `Button.browser.test.tsx`
  - `hooks/useTheme.ts` → `useTheme.browser.test.ts`

```typescript
// ブラウザテストの例
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeSwitcher } from './theme-switcher'

describe('ThemeSwitcher', () => {
  it('テーマ切り替えボタンを表示する', () => {
    render(<ThemeSwitcher />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
```

### Vitest 設定での自動検出

`vitest.config.mts` の設定により、ファイル名で自動的にテストタイプが判定されます：

```typescript
// ユニットテスト（Node.js環境）
include: ['**/__tests__/**/*.unit.{test,spec}.ts']

// ブラウザテスト（Playwright環境）
include: ['**/__tests__/**/*.browser.{test,spec}.ts{,x}']
```

## 基本構造

### ユニットテストの基本構造（`.unit.test.ts`）

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { targetFunction } from '../target-file'

describe('targetFunction', () => {
  beforeEach(() => {
    // 各テスト前のセットアップ
  })

  afterEach(() => {
    // 各テスト後のクリーンアップ
  })

  it('期待する動作を説明', () => {
    // Arrange（準備）
    const input = 'test'

    // Act（実行）
    const result = targetFunction(input)

    // Assert（検証）
    expect(result).toBe('expected')
  })
})
```

### ブラウザテストの基本構造（`.browser.test.tsx`）

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TargetComponent } from '../TargetComponent'

describe('TargetComponent', () => {
  beforeEach(() => {
    // 各テスト前のセットアップ
  })

  afterEach(() => {
    // 各テスト後のクリーンアップ
  })

  it('期待する動作を説明', async () => {
    // Arrange（準備）
    const user = userEvent.setup()
    render(<TargetComponent />)

    // Act（実行）
    await user.click(screen.getByRole('button'))

    // Assert（検証）
    expect(screen.getByText('result')).toBeInTheDocument()
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
expect(value).toBe(expected) // 厳密等価 (===)
expect(value).toEqual(expected) // 深い等価（オブジェクト/配列）
expect(value).toStrictEqual(expected) // undefinedプロパティも含めて比較

// 真偽値
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
expect(value).toBeDefined()

// 数値
expect(value).toBeGreaterThan(3)
expect(value).toBeLessThanOrEqual(5)
expect(value).toBeCloseTo(0.3, 5) // 浮動小数点

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

### ユニットテスト（`.unit.test.ts`）

**📁 対象ファイル：** `utils/`, `lib/` などの純粋な関数

**⚙️ 実行環境：** Node.js

```typescript
// ファイル：utils/__tests__/calculate.unit.test.ts
import { describe, it, expect } from 'vitest'
import { calculateTotal } from '../calculate'

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

**特徴：**

- DOM や React は不要（Node.js で実行）
- ロジックの正確性をテスト
- 高速に実行可能

---

### ブラウザテスト（`.browser.test.tsx`）

**📁 対象ファイル：** `components/`, `hooks/` の React コンポーネント

**⚙️ 実行環境：** Playwright (Chromium ブラウザ)

詳細は [references/react-testing.md](references/react-testing.md) を参照。

```typescript
// ファイル：components/Button/__tests__/Button.browser.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

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

**特徴：**

- React コンポーネントのレンダリングと操作をテスト
- ユーザーインタラクション（クリック、入力）を検証
- ブラウザ環境で実行（JSDOM より詳細なテストが可能）

---

### カスタム Hooks のテスト（`.browser.test.ts`）

Hooks は DOM 操作を含むため、ブラウザテストを使用：

```typescript
// ファイル：hooks/__tests__/useTheme.browser.test.ts
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  it('テーマの状態を返す', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('テーマを切り替える', () => {
    const { result } = renderHook(() => useTheme())
    act(() => {
      result.current.toggleTheme()
    })
    expect(result.current.theme).toBe('dark')
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
  vi.clearAllMocks() // 呼び出し履歴をクリア
})
```

#### ユニットテストでのモック例

```typescript
// ユーティリティ関数のユニットテスト（.unit.test.ts）
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { fetchUserData } from './fetch-user'

// モジュール全体をモック
vi.mock('./api', () => ({
  fetchFromAPI: vi.fn(),
}))

describe('fetchUserData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('APIからユーザーデータを取得する', async () => {
    const { fetchFromAPI } = await import('./api')
    vi.mocked(fetchFromAPI).mockResolvedValueOnce({ id: 1, name: 'Test' })

    const result = await fetchUserData(1)
    expect(result).toEqual({ id: 1, name: 'Test' })
  })
})
```

#### ブラウザテストでのモック例

```typescript
// React コンポーネントのブラウザテスト（.browser.test.tsx）
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UserProfile } from './UserProfile'

// next-themes などの外部ライブラリをモック
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    setTheme: vi.fn(),
  })),
}))

describe('UserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ユーザー情報を表示する', () => {
    render(<UserProfile userId={1} />)
    expect(screen.getByText('User Profile')).toBeInTheDocument()
  })
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

  it('test1', () => {
    /* ... */
  })
  it('test2', () => {
    /* ... */
  })
})
```

## テストケース網羅性チェック

リファクタリング後に、テストケースの過不足を確認するチェックリスト：

### 入力パターン（関数のユニットテスト）

- [ ] **正常系**: 期待される入力で正しく動作するか
  - デフォルトパラメータでの動作
  - 典型的なユースケース
- [ ] **境界値**: 最小値、最大値、長さ制限など
  - 空配列/空文字列
  - 単一要素
  - 最大サイズに近い値
- [ ] **エッジケース**: 特殊な入力
  - null/undefined
  - 負の数
  - 重複データ
  - 非標準フォーマット
- [ ] **異常系**: エラーが期待される入力
  - 無効なフォーマット
  - 型が異なる値
  - 範囲外の値

### 状態・設定パターン

複数の設定オプションがある場合、テーブル駆動テストで検証：

```typescript
// 複数パターンをテーブル化して検証
const testCases = [
  { input: value1, expected: result1, description: 'パターン1' },
  { input: value2, expected: result2, description: 'パターン2' },
  { input: value3, expected: result3, description: 'パターン3' },
]

testCases.forEach(({ input, expected, description }) => {
  it(`${description}を処理する`, () => {
    expect(targetFunction(input)).toBe(expected)
  })
})
```

### Reactコンポーネント（ユーザーインタラクション）

- [ ] **レンダリング**: 正しくUIが表示されるか
  - props有無での表示
  - conditional rendering
  - リスト要素
- [ ] **ユーザーアクション**: クリック、入力などの動作
  - クリックでコールバック呼び出し
  - フォーム入力と状態更新
  - キーボードイベント
- [ ] **状態遷移**: 状態変化に伴うUI更新
  - disabled状態への遷移
  - ローディング状態
  - エラー状態
- [ ] **エッジケース**: 特殊なprops値
  - 空文字列
  - 長いテキスト
  - undefined/null props

### テストケース充実度の自己チェック

以下の問いに全てYESなら、テストケースは十分に網羅されています：

1. **正常系は十分か？** 最も一般的なユースケースが複数テストされているか
2. **エッジケースは含まれているか？** 空値、null、境界値などが対象か
3. **エラーハンドリングはテストされているか？** 無効入力でエラーが発生するか
4. **複数パターンはテーブル駆動か？** 類似テストが重複していないか
5. **テストは独立しているか？** 他のテストに依存していないか
6. **アサーションは具体的か？** toBeTruthyではなく具体的な値で検証しているか
7. **説明は動作を表しているか？** テスト名から実装を予測できるか
