import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, afterEach } from 'vitest'

import BookmarkFilter from '../bookmark-filter'

describe('BookmarkFilter', () => {
  afterEach(() => {
    cleanup()
  })

  it('フォームをレンダリングする', () => {
    const { container } = render(<BookmarkFilter />)
    const form = container.querySelector('form')
    expect(form).toBeTruthy()
    expect(form?.getAttribute('action')).toBe('/bookmarks')
    expect(form?.getAttribute('method')).toBe('get')
  })

  it('検索入力フィールドの属性が正しく設定されている', () => {
    const { container } = render(<BookmarkFilter />)
    const input = container.querySelector('input[type="search"]') as HTMLInputElement
    expect(input).toBeTruthy()
    expect(input.name).toBe('keyword')
    expect(input.placeholder).toBe('キーワードを入力して検索')
    expect(input.className).toContain('text-base')
  })

  it('keywordが提供されていない場合、入力フィールドは空である', () => {
    const { container } = render(<BookmarkFilter />)
    const input = container.querySelector('input[type="search"]') as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('keywordが提供されている場合、デフォルト値として表示される', () => {
    const { container } = render(<BookmarkFilter keyword="テスト" />)
    const input = container.querySelector('input[type="search"]') as HTMLInputElement
    expect(input.value).toBe('テスト')
  })

  it('keywordが空文字列の場合、入力フィールドは空である', () => {
    const { container } = render(<BookmarkFilter keyword="" />)
    const input = container.querySelector('input[type="search"]') as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('検索入力フィールドに入力できる', async () => {
    const user = userEvent.setup()
    const { container } = render(<BookmarkFilter />)
    const input = container.querySelector('input[type="search"]') as HTMLInputElement

    await user.type(input, 'テスト検索')
    expect(input.value).toBe('テスト検索')
  })

  it('検索入力フィールドをクリアできる', async () => {
    const user = userEvent.setup()
    const { container } = render(<BookmarkFilter keyword="初期値" />)
    const input = container.querySelector('input[type="search"]') as HTMLInputElement

    await user.clear(input)
    expect(input.value).toBe('')
  })
})
