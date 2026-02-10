import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import ColorCircle from '../color-circle'

vi.mock('@/lib/string-to-color-with-frame', () => ({
  stringToColorWithFrame: (value: string) => {
    if (value === 'react') return ['#61dafb', '#000']
    if (value === 'typescript') return ['#3178c6', '#fff']
    return ['#888888', '#fff']
  },
}))

const renderComponent = (props: { value: string; glow?: boolean; size?: 'sm' | 'md' | 'lg' }) => {
  return render(<ColorCircle {...props} />)
}

describe('ColorCircle', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
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

  describe('グロー効果', () => {
    it('glow=false (デフォルト) では通常の boxShadow が適用される', () => {
      const { container } = renderComponent({ value: 'react' })
      const circle = container.querySelector('span')

      expect(circle?.style.boxShadow).not.toContain('8px')
    })

    it('glow=true でグロー効果付きの boxShadow が適用される', () => {
      const { container } = renderComponent({ value: 'react', glow: true })
      const circle = container.querySelector('span')

      expect(circle?.style.boxShadow).toContain('8px')
    })
  })

  it('aria-hidden 属性が設定されている', () => {
    const { container } = renderComponent({ value: 'react' })
    const circle = container.querySelector('span')

    expect(circle).toHaveAttribute('aria-hidden', 'true')
  })
})
