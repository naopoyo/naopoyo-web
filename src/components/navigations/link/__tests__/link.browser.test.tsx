import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import Link from '../link'

describe('Link', () => {
  afterEach(() => cleanup())

  it('icon 未指定時は children をそのまま表示する', () => {
    const { container } = render(<Link href="/test">テキスト</Link>)
    const anchor = container.querySelector('a')

    expect(anchor?.textContent).toBe('テキスト')
    expect(container.querySelector('svg')).toBeNull()
  })

  it('icon="arrow" で ArrowRightIcon の SVG が表示される', () => {
    const { container } = render(
      <Link href="/test" icon="arrow">
        テキスト
      </Link>
    )

    expect(container.querySelector('svg')).not.toBeNull()
    expect(container.querySelector('span')?.textContent).toBe('テキスト')
  })

  it('icon="external" で ExternalLinkIcon の SVG が表示される', () => {
    const { container } = render(
      <Link href="/test" icon="external">
        テキスト
      </Link>
    )

    expect(container.querySelector('svg')).not.toBeNull()
    expect(container.querySelector('span')?.textContent).toBe('テキスト')
  })

  it('href が正しく設定される', () => {
    const { container } = render(<Link href="/docs">リンク</Link>)

    expect(container.querySelector('a')?.getAttribute('href')).toBe('/docs')
  })
})
