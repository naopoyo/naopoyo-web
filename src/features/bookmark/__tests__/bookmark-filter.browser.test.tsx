import { render, cleanup } from '@testing-library/react'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
import { describe, it, expect, afterEach } from 'vitest'

import BookmarkFilter from '../bookmark-filter'

const renderComponent = (searchParams: Record<string, string> = {}) => {
  return render(
    <NuqsTestingAdapter searchParams={searchParams}>
      <BookmarkFilter />
    </NuqsTestingAdapter>
  )
}

describe('BookmarkFilter', () => {
  afterEach(() => {
    cleanup()
  })

  describe('レンダリング', () => {
    it('検索入力フィールドをレンダリングする', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]')
      expect(input).toBeInTheDocument()
    })

    it('placeholder が正しく設定されている', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]')
      expect(input).toHaveAttribute('placeholder', 'ブックマークを検索...')
    })
  })

  describe('URL状態', () => {
    it('keywordが提供されていない場合、入力フィールドは空である', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]') as HTMLInputElement
      expect(input).toBeInTheDocument()
      expect(input.value).toBe('')
    })

    it('keywordが提供されている場合、値として表示される', () => {
      const { container } = renderComponent({ keyword: 'テスト' })
      const input = container.querySelector('input[type="search"]') as HTMLInputElement
      expect(input).toBeInTheDocument()
      expect(input.value).toBe('テスト')
    })
  })

  describe('アクセシビリティ', () => {
    it('aria-label が設定されている', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]')

      expect(input).toHaveAttribute('aria-label', 'ブックマーク検索キーワード')
    })
  })
})
