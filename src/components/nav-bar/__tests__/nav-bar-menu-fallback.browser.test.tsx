import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'

import NavBarMenuFallback from '../nav-bar-menu-fallback'

describe('NavBarMenuFallback', () => {
  afterEach(() => {
    cleanup()
  })

  it('スケルトン用の要素をレンダリングする', () => {
    const { container } = render(<NavBarMenuFallback />)
    const element = container.querySelector('div')

    expect(element).toBeTruthy()
  })

  it('高さが h-6 に設定されている', () => {
    const { container } = render(<NavBarMenuFallback />)
    const element = container.querySelector('div')

    expect(element?.className).toContain('h-6')
  })

  it('アニメーションクラス animate-pulse を持っている', () => {
    const { container } = render(<NavBarMenuFallback />)
    const element = container.querySelector('div')

    expect(element?.className).toContain('animate-pulse')
  })

  it('背景色クラス bg-skeleton を持っている', () => {
    const { container } = render(<NavBarMenuFallback />)
    const element = container.querySelector('div')

    expect(element?.className).toContain('bg-skeleton')
  })

  it('角が丸いクラス rounded-sm を持っている', () => {
    const { container } = render(<NavBarMenuFallback />)
    const element = container.querySelector('div')

    expect(element?.className).toContain('rounded-sm')
  })

  it('すべてのスタイルクラスが含まれている', () => {
    const { container } = render(<NavBarMenuFallback />)
    const element = container.querySelector('div') as HTMLDivElement

    const expectedClasses = ['h-6', 'animate-pulse', 'rounded-sm', 'bg-skeleton']
    expectedClasses.forEach((className) => {
      expect(element.className).toContain(className)
    })
  })
})
