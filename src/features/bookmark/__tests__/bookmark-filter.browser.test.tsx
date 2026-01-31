import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, afterEach } from 'vitest'

import BookmarkFilter from '../bookmark-filter'

const renderComponent = (props = {}) => {
  return render(<BookmarkFilter {...props} />)
}

describe('BookmarkFilter', () => {
  afterEach(() => {
    cleanup()
  })

  describe('レンダリング', () => {
    it('フォームをレンダリングする', () => {
      const { container } = renderComponent()
      const form = container.querySelector('form')
      expect(form).toBeInTheDocument()
      expect(form).toHaveAttribute('action', '/bookmarks')
      expect(form).toHaveAttribute('method', 'get')
    })

    it('検索入力フィールドの属性が正しく設定されている', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('name', 'keyword')
      expect(input).toHaveAttribute('placeholder', 'ブックマークを検索...')
      expect(input).toHaveClass('text-base')
    })
  })

  describe('Props', () => {
    it('keywordが提供されていない場合、入力フィールドは空である', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]') as HTMLInputElement
      expect(input).toBeInTheDocument()
      expect(input.value).toBe('')
    })

    it('keywordが提供されている場合、デフォルト値として表示される', () => {
      const { container } = renderComponent({ keyword: 'テスト' })
      const input = container.querySelector('input[type="search"]') as HTMLInputElement
      expect(input).toBeInTheDocument()
      expect(input.value).toBe('テスト')
    })

    it('keywordが空文字列の場合、入力フィールドは空である', () => {
      const { container } = renderComponent({ keyword: '' })
      const input = container.querySelector('input[type="search"]') as HTMLInputElement
      expect(input).toBeInTheDocument()
      expect(input.value).toBe('')
    })
  })

  describe('ユーザー操作', () => {
    it('検索入力フィールドに入力できる', async () => {
      const user = userEvent.setup()
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]') as HTMLInputElement

      expect(input).toBeInTheDocument()
      await user.type(input, 'テスト検索')
      expect(input.value).toBe('テスト検索')
    })

    it('検索入力フィールドをクリアできる', async () => {
      const user = userEvent.setup()
      const { container } = renderComponent({ keyword: '初期値' })
      const input = container.querySelector('input[type="search"]') as HTMLInputElement

      expect(input).toBeInTheDocument()
      await user.clear(input)
      expect(input.value).toBe('')
    })
  })
})
