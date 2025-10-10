import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'

import Footer from '../footer'

// 子コンポーネントを軽量にモックして、Footer がそれらをレンダリングすることを確認する
vi.mock('@/components/site', () => ({
  SnsList: () => {
    return <div data-testid="mock-sns-list">sns-list</div>
  },
}))

vi.mock('@/components/theme-switcher', () => ({
  ThemeSwitcher: () => {
    return <div data-testid="mock-theme-switcher">theme-switcher</div>
  },
}))

describe('Footer コンポーネント', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('主要な要素がレンダリングされること（SNSリスト、テーマスイッチャー、著作表示）', () => {
    render(<Footer />)

    // モックした子コンポーネントが存在すること
    expect(screen.getByTestId('mock-sns-list')).toBeTruthy()
    expect(screen.getByTestId('mock-theme-switcher')).toBeTruthy()

    // 著作表示が正しいこと
    expect(screen.getByText('© naopoyo')).toBeTruthy()

    // フッター要素自体が存在すること（role が自動付与されない環境でもフォールバック）
    const footer = screen.queryByRole('contentinfo') || document.querySelector('footer')
    expect(footer).toBeTruthy()
  })
})
