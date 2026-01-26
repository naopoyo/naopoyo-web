import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'

import NavBarMenuFallback from '../nav-bar-menu-fallback'

const renderComponent = () => {
  return render(<NavBarMenuFallback />)
}

describe('NavBarMenuFallback', () => {
  afterEach(() => {
    cleanup()
  })

  describe('レンダリング', () => {
    it('スケルトン用の要素をレンダリングする', () => {
      const { container } = renderComponent()
      const element = container.querySelector('div')

      expect(element).toBeInTheDocument()
    })
  })

  describe('スタイリング', () => {
    it('高さが h-6 に設定されている', () => {
      const { container } = renderComponent()
      const element = container.querySelector('div')

      expect(element).toHaveClass('h-6')
    })

    it('アニメーションクラス animate-pulse を持っている', () => {
      const { container } = renderComponent()
      const element = container.querySelector('div')

      expect(element).toHaveClass('animate-pulse')
    })

    it('背景色クラス bg-skeleton を持っている', () => {
      const { container } = renderComponent()
      const element = container.querySelector('div')

      expect(element).toHaveClass('bg-skeleton')
    })

    it('角が丸いクラス rounded-sm を持っている', () => {
      const { container } = renderComponent()
      const element = container.querySelector('div')

      expect(element).toHaveClass('rounded-sm')
    })

    it('すべてのスタイルクラスが含まれている', () => {
      const { container } = renderComponent()
      const element = container.querySelector('div')

      const expectedClasses = ['h-6', 'animate-pulse', 'rounded-sm', 'bg-skeleton']
      expectedClasses.forEach((className) => {
        expect(element).toHaveClass(className)
      })
    })
  })
})
