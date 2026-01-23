# Reactコンポーネントテストガイド

## 目次

1. [セットアップ](#セットアップ)
2. [基本的なレンダリング](#基本的なレンダリング)
3. [クエリメソッド](#クエリメソッド)
4. [ユーザーインタラクション](#ユーザーインタラクション)
5. [非同期テスト](#非同期テスト)
6. [フォームテスト](#フォームテスト)
7. [コンテキスト・プロバイダー](#コンテキストプロバイダー)
8. [カスタムフック](#カスタムフック)

---

## セットアップ

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

---

## 基本的なレンダリング

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Greeting } from './Greeting'

describe('Greeting', () => {
  it('名前を表示する', () => {
    render(<Greeting name="Taro" />)

    expect(screen.getByText('Hello, Taro!')).toBeInTheDocument()
  })

  it('デフォルトの名前を表示する', () => {
    render(<Greeting />)

    expect(screen.getByText('Hello, Guest!')).toBeInTheDocument()
  })
})
```

---

## クエリメソッド

### 優先度（推奨順）

1. **getByRole** - アクセシビリティに基づく（最も推奨）
2. **getByLabelText** - フォーム要素
3. **getByPlaceholderText** - プレースホルダー
4. **getByText** - テキストコンテンツ
5. **getByTestId** - 最終手段

### getByRole

```typescript
// ボタン
screen.getByRole('button', { name: 'Submit' })
screen.getByRole('button', { name: /submit/i })

// リンク
screen.getByRole('link', { name: 'Home' })

// テキストボックス
screen.getByRole('textbox', { name: 'Email' })

// チェックボックス
screen.getByRole('checkbox', { name: 'Agree to terms' })

// 見出し
screen.getByRole('heading', { name: 'Welcome', level: 1 })

// リスト
screen.getByRole('list')
screen.getAllByRole('listitem')
```

### get / query / find の違い

| メソッド   | 見つからない場合 | 用途                       |
| ---------- | ---------------- | -------------------------- |
| `getBy*`   | エラー           | 要素が必ず存在する         |
| `queryBy*` | null             | 要素が存在しないことを確認 |
| `findBy*`  | Promise (reject) | 非同期で表示される要素     |

```typescript
// 要素が存在することを確認
expect(screen.getByRole('button')).toBeInTheDocument()

// 要素が存在しないことを確認
expect(screen.queryByRole('alert')).not.toBeInTheDocument()

// 非同期で表示される要素を待つ
const message = await screen.findByText('Success!')
expect(message).toBeInTheDocument()
```

---

## ユーザーインタラクション

`@testing-library/user-event` を使用。

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

describe('Counter', () => {
  it('ボタンクリックでカウントが増加する', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    expect(screen.getByText('Count: 0')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Increment' }))

    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })
})
```

### よく使うインタラクション

```typescript
const user = userEvent.setup()

// クリック
await user.click(element)
await user.dblClick(element)

// テキスト入力
await user.type(input, 'Hello')

// 入力をクリアしてから入力
await user.clear(input)
await user.type(input, 'New value')

// キーボード
await user.keyboard('{Enter}')
await user.keyboard('{Shift>}A{/Shift}') // Shift+A

// セレクト
await user.selectOptions(select, 'option1')
await user.selectOptions(select, ['option1', 'option2']) // 複数選択

// ホバー
await user.hover(element)
await user.unhover(element)

// タブ移動
await user.tab()
```

---

## 非同期テスト

### waitFor

```typescript
import { render, screen, waitFor } from '@testing-library/react'

it('データをロードして表示する', async () => {
  render(<UserProfile id="1" />)

  // ローディング表示を確認
  expect(screen.getByText('Loading...')).toBeInTheDocument()

  // データ表示を待つ
  await waitFor(() => {
    expect(screen.getByText('Taro')).toBeInTheDocument()
  })

  // ローディングが消えていることを確認
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
})
```

### findBy

```typescript
it('非同期で表示されるメッセージ', async () => {
  render(<AsyncMessage />)

  // findByは自動的に待機する（デフォルト1秒）
  const message = await screen.findByText('Data loaded!')

  expect(message).toBeInTheDocument()
})

// タイムアウトを変更
const message = await screen.findByText('Data loaded!', {}, { timeout: 3000 })
```

---

## フォームテスト

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('フォームを送信する', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Email'), 'test@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('バリデーションエラーを表示する', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} />)

    // 空のまま送信
    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('送信中は入力を無効化する', async () => {
    const user = userEvent.setup()
    render(<LoginForm onSubmit={vi.fn()} isSubmitting />)

    expect(screen.getByLabelText('Email')).toBeDisabled()
    expect(screen.getByLabelText('Password')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Submitting...' })).toBeDisabled()
  })
})
```

---

## コンテキスト・プロバイダー

### カスタムrender

```typescript
// src/test/test-utils.tsx
import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from './ThemeContext'
import { AuthProvider } from './AuthContext'

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

```typescript
// テストで使用
import { render, screen } from './test-utils'
import { UserMenu } from './UserMenu'

it('認証済みユーザーのメニューを表示', () => {
  render(<UserMenu />)
  // AuthProviderが自動的にラップされる
})
```

### 特定のコンテキスト値でテスト

```typescript
import { render, screen } from '@testing-library/react'
import { ThemeContext } from './ThemeContext'
import { ThemeToggle } from './ThemeToggle'

it('ダークモードでレンダリング', () => {
  render(
    <ThemeContext.Provider value={{ theme: 'dark', setTheme: vi.fn() }}>
      <ThemeToggle />
    </ThemeContext.Provider>
  )

  expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
})
```

---

## カスタムフック

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('初期値を設定する', () => {
    const { result } = renderHook(() => useCounter(5))

    expect(result.current.count).toBe(5)
  })

  it('incrementでカウントが増加する', () => {
    const { result } = renderHook(() => useCounter(0))

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('propsの変更に対応する', () => {
    const { result, rerender } = renderHook(({ initialCount }) => useCounter(initialCount), {
      initialProps: { initialCount: 0 },
    })

    expect(result.current.count).toBe(0)

    rerender({ initialCount: 10 })

    // フックの実装による
  })
})
```

### プロバイダーが必要なフック

```typescript
import { renderHook } from '@testing-library/react'
import { AuthProvider } from './AuthContext'
import { useAuth } from './useAuth'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

it('認証状態を取得する', () => {
  const { result } = renderHook(() => useAuth(), { wrapper })

  expect(result.current.isAuthenticated).toBe(false)
})
```
