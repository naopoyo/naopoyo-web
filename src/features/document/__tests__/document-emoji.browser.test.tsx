import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import DocumentEmoji from '../document-emoji'

vi.mock('@twemoji/api', () => ({
  default: {
    convert: {
      toCodePoint: vi.fn((emoji: string) => {
        const codePoints: Record<string, string> = {
          '😀': '1f600',
          '😂': '1f602',
          '🎉': '1f389',
        }
        return codePoints[emoji] || 'unknown'
      }),
    },
    base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji/assets/72x72/',
  },
}))

const renderComponent = (emoji: string) => {
  return render(<DocumentEmoji emoji={emoji} />)
}

describe('DocumentEmoji', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本動作', () => {
    it('絵文字を表示する', () => {
      const { container } = renderComponent('😀')
      const img = container.querySelector('img')

      expect(img).toBeInTheDocument()
      expect(img?.alt).toBe('😀')
    })

    it('絵文字が無効な場合はスペーサーを表示する', () => {
      const { container } = renderComponent('')
      const span = container.querySelector('span')

      expect(span).toBeInTheDocument()
    })

    it('絵文字が string 型でない場合はスペーサーを表示する', () => {
      const { container } = renderComponent(undefined as unknown as string)
      const span = container.querySelector('span')

      expect(span).toBeInTheDocument()
    })
  })

  describe('SVG URL 生成', () => {
    it('有効な絵文字から SVG URL を生成する', () => {
      const { container } = renderComponent('😀')
      const img = container.querySelector('img')

      expect(img?.src).toContain('1f600.svg')
    })

    it('複数の異なる絵文字に対応する', () => {
      const { container, rerender } = renderComponent('😀')
      let img = container.querySelector('img')
      expect(img?.src).toContain('1f600.svg')

      rerender(<DocumentEmoji emoji="🎉" />)
      img = container.querySelector('img')
      expect(img?.src).toContain('1f389.svg')
    })
  })

  describe('属性と寸法', () => {
    it('画像の幅と高さが 72px に設定されている', () => {
      const { container } = renderComponent('😀')
      const img = container.querySelector('img')

      expect(img?.getAttribute('width')).toBe('72')
      expect(img?.getAttribute('height')).toBe('72')
    })

    it('picture 要素でラップされている', () => {
      const { container } = renderComponent('😀')
      const picture = container.querySelector('picture')

      expect(picture).toBeInTheDocument()
      expect(picture?.querySelector('img')).toBeInTheDocument()
    })
  })

  describe('アクセシビリティ', () => {
    it('スペーサーに aria-hidden 属性が設定されている', () => {
      const { container } = renderComponent('')
      const span = container.querySelector('span')

      expect(span?.getAttribute('aria-hidden')).toBe('true')
    })

    it('画像に alt テキストが設定されている', () => {
      const { container } = renderComponent('😀')
      const img = container.querySelector('img')

      expect(img?.getAttribute('alt')).toBe('😀')
    })
  })
})
