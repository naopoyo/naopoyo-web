# Vitestモックガイド

## 目次

1. [vi.fn() - 関数モック](#vifn---関数モック)
2. [vi.spyOn() - スパイ](#vispyon---スパイ)
3. [vi.mock() - モジュールモック](#vimock---モジュールモック)
4. [タイマーモック](#タイマーモック)
5. [モックのリセット](#モックのリセット)

---

## vi.fn() - 関数モック

コールバックやハンドラをモックする場合に使用。

```typescript
import { vi, describe, it, expect } from 'vitest'

describe('vi.fn()', () => {
  it('基本的な使い方', () => {
    const mockFn = vi.fn()

    mockFn('arg1', 'arg2')

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('戻り値を設定', () => {
    const mockFn = vi.fn()
    mockFn.mockReturnValue('fixed value')

    expect(mockFn()).toBe('fixed value')
  })

  it('一度だけ戻り値を設定', () => {
    const mockFn = vi.fn()
    mockFn
      .mockReturnValueOnce('first')
      .mockReturnValueOnce('second')
      .mockReturnValue('default')

    expect(mockFn()).toBe('first')
    expect(mockFn()).toBe('second')
    expect(mockFn()).toBe('default')
  })

  it('非同期の戻り値', async () => {
    const mockFn = vi.fn()
    mockFn.mockResolvedValue({ data: 'test' })

    const result = await mockFn()
    expect(result).toEqual({ data: 'test' })
  })

  it('エラーをスロー', async () => {
    const mockFn = vi.fn()
    mockFn.mockRejectedValue(new Error('Failed'))

    await expect(mockFn()).rejects.toThrow('Failed')
  })

  it('カスタム実装', () => {
    const mockFn = vi.fn((a: number, b: number) => a + b)

    expect(mockFn(2, 3)).toBe(5)
  })
})
```

### 呼び出し履歴の検証

```typescript
const mockFn = vi.fn()
mockFn('a')
mockFn('b', 'c')

// 呼び出し回数
expect(mockFn).toHaveBeenCalledTimes(2)

// 特定の引数で呼ばれたか
expect(mockFn).toHaveBeenCalledWith('a')
expect(mockFn).toHaveBeenCalledWith('b', 'c')

// 最後の呼び出し
expect(mockFn).toHaveBeenLastCalledWith('b', 'c')

// N番目の呼び出し
expect(mockFn).toHaveBeenNthCalledWith(1, 'a')
expect(mockFn).toHaveBeenNthCalledWith(2, 'b', 'c')

// 呼び出し履歴に直接アクセス
expect(mockFn.mock.calls).toEqual([['a'], ['b', 'c']])
expect(mockFn.mock.results[0].value).toBeUndefined()
```

---

## vi.spyOn() - スパイ

既存のオブジェクトメソッドを監視・モックする場合に使用。

```typescript
import { vi, describe, it, expect, afterEach } from 'vitest'

const calculator = {
  add: (a: number, b: number) => a + b,
  multiply: (a: number, b: number) => a * b,
}

describe('vi.spyOn()', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('メソッドを監視する', () => {
    const spy = vi.spyOn(calculator, 'add')

    const result = calculator.add(2, 3)

    expect(result).toBe(5)  // 元の実装が動く
    expect(spy).toHaveBeenCalledWith(2, 3)
  })

  it('実装を置き換える', () => {
    const spy = vi.spyOn(calculator, 'add')
    spy.mockReturnValue(100)

    expect(calculator.add(2, 3)).toBe(100)
  })

  it('元の実装を復元する', () => {
    const spy = vi.spyOn(calculator, 'add')
    spy.mockReturnValue(100)

    expect(calculator.add(2, 3)).toBe(100)

    spy.mockRestore()

    expect(calculator.add(2, 3)).toBe(5)
  })
})
```

### console のスパイ

```typescript
it('console.logの呼び出しを検証', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

  console.log('test message')

  expect(consoleSpy).toHaveBeenCalledWith('test message')
})

it('console.errorの呼び出しを検証', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  // テスト対象の関数を実行

  expect(consoleSpy).toHaveBeenCalled()
})
```

---

## vi.mock() - モジュールモック

外部モジュールやファイルをモックする場合に使用。

```typescript
// api.ts
export const fetchUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

// user-service.test.ts
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { fetchUser } from './api'
import { getUserName } from './user-service'

// モジュール全体をモック
vi.mock('./api', () => ({
  fetchUser: vi.fn(),
}))

describe('getUserName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ユーザー名を取得する', async () => {
    vi.mocked(fetchUser).mockResolvedValue({ id: '1', name: 'Taro' })

    const name = await getUserName('1')

    expect(name).toBe('Taro')
    expect(fetchUser).toHaveBeenCalledWith('1')
  })

  it('ユーザーが見つからない場合', async () => {
    vi.mocked(fetchUser).mockResolvedValue(null)

    const name = await getUserName('999')

    expect(name).toBeNull()
  })
})
```

### 部分モック

```typescript
// 一部の関数だけモックし、残りは元の実装を使用
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return {
    ...actual,
    formatDate: vi.fn(() => '2024-01-01'),
  }
})
```

### デフォルトエクスポートのモック

```typescript
// default export をモック
vi.mock('./config', () => ({
  default: {
    apiUrl: 'http://mock-api.com',
    timeout: 1000,
  },
}))
```

### クラスのモック

```typescript
vi.mock('./Database', () => ({
  Database: vi.fn().mockImplementation(() => ({
    connect: vi.fn().mockResolvedValue(true),
    query: vi.fn().mockResolvedValue([]),
    close: vi.fn(),
  })),
}))
```

---

## タイマーモック

setTimeout, setInterval などをモック。

```typescript
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('タイマーモック', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('setTimeoutをモック', () => {
    const callback = vi.fn()

    setTimeout(callback, 1000)

    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1000)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('setIntervalをモック', () => {
    const callback = vi.fn()

    setInterval(callback, 500)

    vi.advanceTimersByTime(1500)

    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('すべてのタイマーを実行', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    setTimeout(callback1, 1000)
    setTimeout(callback2, 2000)

    vi.runAllTimers()

    expect(callback1).toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()
  })

  it('日付をモック', () => {
    const mockDate = new Date('2024-01-15T12:00:00')
    vi.setSystemTime(mockDate)

    expect(new Date()).toEqual(mockDate)
    expect(Date.now()).toBe(mockDate.getTime())
  })
})
```

---

## モックのリセット

```typescript
import { vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  // 呼び出し履歴と戻り値の設定をクリア（実装は保持）
  vi.clearAllMocks()
})

afterEach(() => {
  // モックを元の実装に復元
  vi.restoreAllMocks()

  // すべてのモックをリセット（vi.mock含む）
  vi.resetAllMocks()
})
```

### 各メソッドの違い

| メソッド | 呼び出し履歴 | 戻り値設定 | 実装 |
|---------|------------|----------|------|
| `clearAllMocks()` | クリア | クリア | 保持 |
| `resetAllMocks()` | クリア | クリア | リセット |
| `restoreAllMocks()` | クリア | クリア | 元に戻す |
