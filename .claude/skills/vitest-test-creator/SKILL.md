---
name: vitest-test-creator
description: Vitest を使用したテストコード作成・リファクタリング・デバッグ。ユニットテスト(.unit.test.ts)、Reactコンポーネント・Hooksテスト(.browser.test.tsx)に対応。「テストを書いて」「テストケースを追加して」「テストをリファクタリングして」「このテストをガイドラインに沿って修正して」などのリクエストで使用。.test.ts/.test.tsx ファイルの作成・編集・改善が必要な場合に活用。
---

# Vitest Test Creator

## 🚀 クイックスタート

### ユニットテスト（純粋な関数）

```typescript
// src/utils/__tests__/sum.unit.test.ts
import { describe, it, expect } from 'vitest'
import { sum } from '../sum'

describe('sum', () => {
  it('2つの数を足す', () => {
    expect(sum(2, 3)).toBe(5)
  })
})
```

### ブラウザテスト（Reactコンポーネント）

```typescript
// src/components/__tests__/Button.browser.test.tsx
import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  afterEach(() => cleanup())

  it('ボタンが表示される', () => {
    const { container } = render(<Button>Click</Button>)
    expect(container.querySelector('button')).toBeInTheDocument()
  })
})
```

テストタイプの詳細は [file-layout.md](references/file-layout.md) を参照。

---

## テスト実行コマンド

| 用途                 | コマンド                                                         |
| -------------------- | ---------------------------------------------------------------- |
| **特定ファイル実行** | `pnpm test:run src/components/__tests__/Button.browser.test.tsx` |
| **パターンマッチ**   | `pnpm test:run bookmark`                                         |
| **全テスト実行**     | `pnpm test:run`                                                  |
| **カバレッジ付き**   | `pnpm test:coverage`                                             |

詳細は [workflow.md](references/workflow.md) を参照。

---

## よくあるトラブル（TOP 3）

### ❌ jest-dom マッチャーが見つからない

**エラー:** `Property 'toBeInTheDocument' does not exist`

**解決:**

- テストファイルが `.browser.test.tsx` 拡張子か確認
- `vitest.setup.ts` に `import '@testing-library/jest-dom/vitest'` があるか確認

### ❌ `screen.getByRole()` で複数要素エラー

**エラー:** `Found multiple elements with role "searchbox"`

**解決:** `container.querySelector()` を使用するか、`afterEach(() => cleanup())` を追加

### ❌ テストがタイムアウト

**エラー:** `Timeout of XXXX ms`

**解決:**

- 非同期テストに `await` があるか確認
- `vi.useFakeTimers()` を使用している場合は `vi.runAllTimers()` を追加

すべてのトラブルシューティング → [troubleshooting.md](references/troubleshooting.md)

---

## 次のステップ

**テスト作成・編集:**

- [unit-testing.md](references/unit-testing.md) - ユニットテストの基本構造、パターン、ベストプラクティス
- [browser-testing.md](references/browser-testing.md) - ブラウザテストの基本構造、例、ベストプラクティス
- [file-layout.md](references/file-layout.md) - テストファイル配置・命名規則

**テストデータ・モック:**

- [test-data-factories.md](references/test-data-factories.md) - テストデータ生成（fishery、@faker-js/faker）
- [mocking.md](references/mocking.md) - 関数モック、モジュールモック、Next.js モック

**リファレンス:**

- [jest-dom-matchers.md](references/jest-dom-matchers.md) - jest-dom マッチャー完全リスト
- [workflow.md](references/workflow.md) - テスト実行ワークフロー、開発フロー、トラブルシューティング手順
- [troubleshooting.md](references/troubleshooting.md) - エラー別トラブルシューティング完全ガイド
