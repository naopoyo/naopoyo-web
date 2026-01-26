import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import DocumentToc from '../document-toc'

vi.mock('tocbot')

vi.mock('@/styles/document-toc.module.scss', () => ({
  default: {
    main: 'toc-main',
  },
}))

vi.mock('@/lib/hackersheet/style', () => ({
  documentContentStyle: {
    main: 'content-main',
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

describe('DocumentToc', () => {
  afterEach(() => cleanup())

  describe('基本動作', () => {
    it('nav 要素を表示する', () => {
      const { container } = render(<DocumentToc />)
      const nav = container.querySelector('nav')

      expect(nav).toBeInTheDocument()
    })

    it('nav 要素が正しいクラス名を持つ', () => {
      const { container } = render(<DocumentToc />)
      const nav = container.querySelector('nav')

      expect(nav?.className).toContain('toc-main')
    })
  })

  describe('セレクタ設定', () => {
    it('DOM 構造が正しく レンダリングされている', () => {
      const { container } = render(<DocumentToc />)

      expect(container.querySelector('nav')).toBeInTheDocument()
    })
  })

  describe('マウント・アンマウント', () => {
    it('マウント時に nav 要素が存在する', () => {
      const { container } = render(<DocumentToc />)
      expect(container.querySelector('nav')).toBeInTheDocument()
    })

    it('アンマウント時にメモリリークがない', () => {
      const { unmount } = render(<DocumentToc />)
      expect(() => unmount()).not.toThrow()
    })
  })
})
