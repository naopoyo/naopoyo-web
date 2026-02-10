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

import DocumentDropdownToc from '../document-dropdown-toc'

const renderComponent = () => {
  return render(<DocumentDropdownToc />)
}

describe('DocumentDropdownToc', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('「目次」ボタンを表示する', () => {
    const { container } = renderComponent()
    const button = container.querySelector('button')

    expect(button).toBeInTheDocument()
    expect(button?.textContent).toBe('目次')
  })

  it('ボタンをクリックするとドロップダウンメニューが開き nav が表示される', async () => {
    const user = userEvent.setup()
    const { container } = renderComponent()
    const button = container.querySelector('button')!

    await user.click(button)

    const navs = Array.from(document.querySelectorAll('nav'))
    expect(navs.length).toBeGreaterThan(0)
  })
})
