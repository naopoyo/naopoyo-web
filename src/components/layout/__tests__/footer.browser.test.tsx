import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'

import Footer from '../footer'

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

  describe('子コンポーネント', () => {
    it('SNSリストがレンダリングされること', () => {
      render(<Footer />)
      expect(screen.getByTestId('mock-sns-list')).toBeInTheDocument()
    })

    it('テーマスイッチャーがレンダリングされること', () => {
      render(<Footer />)
      expect(screen.getByTestId('mock-theme-switcher')).toBeInTheDocument()
    })
  })

  describe('コンテンツ', () => {
    it('著作表示が正しく表示されること', () => {
      render(<Footer />)
      expect(screen.getByText('© naopoyo')).toBeInTheDocument()
    })
  })

  describe('構造', () => {
    it('footer 要素としてレンダリングされること', () => {
      render(<Footer />)
      const footer = screen.queryByRole('contentinfo') || document.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })
  })
})
