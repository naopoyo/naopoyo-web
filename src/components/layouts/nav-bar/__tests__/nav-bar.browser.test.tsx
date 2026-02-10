import { render, cleanup } from '@testing-library/react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

vi.mock('next/navigation', () => ({
  useSelectedLayoutSegment: vi.fn(),
}))

import NavBar from '../nav-bar'

const mockUseSelectedLayoutSegment = vi.mocked(useSelectedLayoutSegment)

const renderComponent = () => {
  return render(<NavBar />)
}

describe('NavBar', () => {
  beforeEach(() => {
    mockUseSelectedLayoutSegment.mockReturnValue(null)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('レイアウト', () => {
    it('header 要素を含む', () => {
      const { container } = renderComponent()
      expect(container.querySelector('header')).toBeInTheDocument()
    })

    it('ロゴが「naopoyo.com」を表示し "/" へリンクする', () => {
      const { container } = renderComponent()
      const logoLink = container.querySelector('a[href="/"]')

      expect(logoLink).toBeInTheDocument()
      expect(logoLink?.textContent).toBe('naopoyo.com')
    })
  })

  describe('ナビゲーションメニュー', () => {
    it('メニューリスト（ul）が表示される', () => {
      const { container } = renderComponent()
      expect(container.querySelector('ul')).toBeInTheDocument()
    })
  })
})
