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

const renderComponent = () => {
  return render(<Footer />)
}

describe('Footer', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('子コンポーネント', () => {
    it('SNSリストがレンダリングされること', () => {
      renderComponent()
      expect(screen.getByTestId('mock-sns-list')).toBeInTheDocument()
    })

    it('テーマスイッチャーがレンダリングされること', () => {
      renderComponent()
      expect(screen.getByTestId('mock-theme-switcher')).toBeInTheDocument()
    })
  })

  describe('コンテンツ', () => {
    it('著作表示が正しく表示されること', () => {
      renderComponent()
      expect(screen.getByText('© naopoyo')).toBeInTheDocument()
    })
  })

  describe('構造', () => {
    it('footer 要素としてレンダリングされること', () => {
      renderComponent()
      const footer = screen.queryByRole('contentinfo') || document.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })
  })
})
