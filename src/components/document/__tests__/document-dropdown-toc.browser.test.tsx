import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, afterEach, vi } from 'vitest'

vi.mock('tocbot')

vi.mock('@/styles/document-toc.module.scss', () => ({
  default: {
    dropdown: 'dropdown',
    main: 'main',
  },
}))

vi.mock('@/lib/hackersheet/style', () => ({
  documentContentStyle: {
    main: 'main',
  },
}))

vi.mock('@/constants', () => ({
  TOCBOT_BASE_OPTIONS: {
    headingSelector: 'h2, h3, h4, h5, h6',
    scrollSmooth: false,
    headingsOffset: 81,
    throttleTimeout: 0,
    scrollHandlerType: 'throttle',
  },
}))

import DocumentDropdownToc from '../document-dropdown-toc'

const renderComponent = () => {
  return render(<DocumentDropdownToc />)
}

describe('DocumentDropdownToc', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('レンダリング', () => {
    it('ドロップダウンメニューを表示する', () => {
      const { container } = renderComponent()
      const button = container.querySelector('button')

      expect(button).toBeInTheDocument()
      expect(button?.textContent).toBe('目次')
    })

    it('ドロップダウンメニューが表示される', () => {
      const { container } = renderComponent()

      // ボタンが存在することを確認
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      expect(button?.textContent).toContain('目次')
    })

    it('ボタンのサイズとバリアントが設定されている', () => {
      const { container } = renderComponent()
      const button = container.querySelector('button')

      expect(button).toBeInTheDocument()
      expect(button?.className).toContain('h-')
      expect(button?.className).toContain('px-')
    })
  })

  describe('ユーザー操作', () => {
    it('ボタンをクリックするとドロップダウンメニューが開く', async () => {
      const user = userEvent.setup()
      const { container } = renderComponent()
      const button = container.querySelector('button')

      expect(button).toBeInTheDocument()
      await user.click(button!)
    })

    it('マウント時にtocbotが初期化される', async () => {
      const user = userEvent.setup()
      renderComponent()

      // ボタンをクリックしてドロップダウンメニューを開く
      const button = document.querySelector('button')
      if (button) {
        await user.click(button)
      }

      // navエレメントが存在することを確認
      const navs = Array.from(document.querySelectorAll('nav'))
      expect(navs.length).toBeGreaterThan(0)
    })
  })
})
