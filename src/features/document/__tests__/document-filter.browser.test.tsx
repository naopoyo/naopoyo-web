import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
import { describe, it, expect, afterEach, vi } from 'vitest'

import DocumentFilter from '../document-filter'

vi.mock('../sort-by-select', () => ({
  default: () => <div data-testid="sort-by-select">sort</div>,
}))

const renderComponent = (searchParams: Record<string, string> = {}) => {
  return render(
    <NuqsTestingAdapter searchParams={searchParams}>
      <DocumentFilter />
    </NuqsTestingAdapter>
  )
}

describe('DocumentFilter', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe('基本動作', () => {
    it('フィルターコンテナが表示される', () => {
      const { container } = renderComponent()
      const filterContainer = container.querySelector('div')

      expect(filterContainer).toBeInTheDocument()
    })

    it('検索入力フィールドが表示される', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]')

      expect(input).toBeInTheDocument()
    })

    it('SortBySelect コンポーネントが表示される', () => {
      const { container } = renderComponent()
      const sortBySelect = container.querySelector('[data-testid="sort-by-select"]')

      expect(sortBySelect).toBeInTheDocument()
    })
  })

  describe('URL状態', () => {
    it('keywordが提供されていない場合、入力フィールドは空である', () => {
      const { container } = renderComponent()
      const input = container.querySelector('input[type="search"]') as HTMLInputElement

      expect(input).toBeInTheDocument()
      expect(input.value).toBe('')
    })

    it('キーワードが設定されている場合は入力フィールドに反映される', () => {
      const { container } = renderComponent({ keyword: 'test' })
      const input = container.querySelector('input[type="search"]') as HTMLInputElement

      expect(input.value).toBe('test')
    })
  })

  describe('レイアウト', () => {
    it('レスポンシブレイアウトのクラスが設定されている', () => {
      const { container } = renderComponent()
      const wrapper = container.querySelector('div')

      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('flex-col')
    })
  })
})
