import { render, screen, cleanup } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

import Avater, { AvaterProps } from '../avatar'

// テスト用に next/image をモックして通常の img 要素を返す
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // モックした img に対して next/no-img-element と alt テキストのアクセシビリティルールを無効化
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
    return <img {...(props as any)} />
  },
}))

describe('Avatar コンポーネント', () => {
  const sizes: AvaterProps['size'][] = ['xs', 'sm', 'base', 'lg']

  test.each(sizes)('サイズ %s が正しくレンダリングされること', (size: AvaterProps['size']) => {
    // テストの反復ごとに DOM をクリーンにする
    cleanup()
    render(<Avater size={size} />)

    const img = screen.getByRole('img') as HTMLImageElement
    // このプロジェクト設定では jest-dom の toBeInTheDocument が型の問題を引き起こすことがあるため、
    // 型安全な単純な truthy アサーションを使用する
    expect(img).toBeTruthy()
    expect(img.alt).toBe('Avater')

    // width/height プロパティはモックされた img の属性として出力される
    // コンポーネント内の sizeMap: xs:64, sm:128, base:192, lg:256
    const expected = size === 'xs' ? '64' : size === 'sm' ? '128' : size === 'base' ? '192' : '256'
    expect(img.getAttribute('width')).toBe(expected)
    expect(img.getAttribute('height')).toBe(expected)
  })
})
