import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import ColorCircle from '../color-circle'

// ============================================================================
// Mocks
// ============================================================================

vi.mock('@/lib/string-to-color-with-frame', () => ({
  stringToColorWithFrame: (value: string) => {
    // テスト用に決定的な色を返す
    if (value === 'react') return ['#61dafb', '#000']
    if (value === 'typescript') return ['#3178c6', '#fff']
    return ['#888888', '#fff']
  },
}))

// ============================================================================
// Helpers
// ============================================================================

const renderComponent = (props: { value: string; glow?: boolean; size?: 'sm' | 'md' | 'lg' }) => {
  return render(<ColorCircle {...props} />)
}

describe('ColorCircle', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本レンダリング', () => {
    it('span 要素としてレンダリングされる', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle).toBeInTheDocument()
    })

    it('aria-hidden 属性が設定されている', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle).toHaveAttribute('aria-hidden', 'true')
    })

    it('rounded-full クラスが適用されている', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle?.className).toContain('rounded-full')
    })
  })

  describe('色の適用', () => {
    it('value に基づいた背景色が適用される', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle).toHaveStyle({ backgroundColor: '#61dafb' })
    })

    it('異なる value には異なる色が適用される', () => {
      const { container } = renderComponent({ value: 'typescript' })
      const circle = container.querySelector('span')

      expect(circle).toHaveStyle({ backgroundColor: '#3178c6' })
    })
  })

  describe('サイズバリアント', () => {
    it('size="sm" で size-1.5 クラスが適用される', () => {
      const { container } = renderComponent({ value: 'react', size: 'sm' })
      const circle = container.querySelector('span')

      expect(circle?.className).toContain('size-1.5')
    })

    it('size="md" で size-2.5 クラスが適用される', () => {
      const { container } = renderComponent({ value: 'react', size: 'md' })
      const circle = container.querySelector('span')

      expect(circle?.className).toContain('size-2.5')
    })

    it('size="lg" で size-3.5 クラスが適用される', () => {
      const { container } = renderComponent({ value: 'react', size: 'lg' })
      const circle = container.querySelector('span')

      expect(circle?.className).toContain('size-3.5')
    })

    it('size 未指定時は size-full クラスが適用される', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle?.className).toContain('size-full')
    })
  })

  describe('グロー効果', () => {
    it('glow=false (デフォルト) では通常の boxShadow が適用される', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      // boxShadow に glow 効果（8px 2px）が含まれていないことを確認
      expect(circle?.style.boxShadow).not.toContain('8px')
    })

    it('glow=true でグロー効果付きの boxShadow が適用される', () => {
      const { container } = renderComponent({ value: 'react', glow: true })
      const circle = container.querySelector('span')

      // boxShadow に glow 効果（8px 2px）が含まれていることを確認
      expect(circle?.style.boxShadow).toContain('8px')
    })
  })

  describe('トランジション', () => {
    it('transition-all クラスが適用されている', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle?.className).toContain('transition-all')
    })

    it('duration-300 クラスが適用されている', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle?.className).toContain('duration-300')
    })
  })
})
