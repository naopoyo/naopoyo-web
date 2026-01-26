import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import DocumentFilter from '../document-filter'

vi.mock('../sort-by-select', () => ({
  default: ({ sortBy }: { sortBy?: string }) => (
    <div data-testid="sort-by-select">{sortBy || 'default'}</div>
  ),
}))

interface InputProps {
  type?: string
  name?: string
  placeholder?: string
  defaultValue?: string
  className?: string
}

vi.mock('@/components/ui/input', () => ({
  Input: ({ type, name, placeholder, defaultValue, className }: InputProps) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={className}
      data-testid={name}
    />
  ),
}))

describe('DocumentFilter', () => {
  afterEach(() => cleanup())

  describe('基本動作', () => {
    it('フィルターフォームが表示される', () => {
      const { container } = render(<DocumentFilter />)
      const form = container.querySelector('form')

      expect(form).toBeInTheDocument()
    })

    it('検索入力フィールドが表示される', () => {
      const { container } = render(<DocumentFilter />)
      const input = container.querySelector('input[type="search"]')

      expect(input).toBeInTheDocument()
    })

    it('SortBySelect コンポーネントが表示される', () => {
      const { container } = render(<DocumentFilter />)
      const sortBySelect = container.querySelector('[data-testid="sort-by-select"]')

      expect(sortBySelect).toBeInTheDocument()
    })
  })

  describe('Props の設定', () => {
    it('キーワードが設定されている場合は入力フィールドに反映される', () => {
      const { container } = render(<DocumentFilter keyword="test" />)
      const input = container.querySelector('input[type="search"]') as HTMLInputElement

      expect(input?.defaultValue).toBe('test')
    })

    it('sortBy が設定されている場合は hidden フィールドに設定される', () => {
      const { container } = render(<DocumentFilter sortBy="modified_at" />)
      const hiddenInput = container.querySelector('input[type="hidden"]')

      expect(hiddenInput?.getAttribute('value')).toBe('modified_at')
    })
  })

  describe('フォーム属性', () => {
    it('フォームが /docs に GET リクエストを送信する', () => {
      const { container } = render(<DocumentFilter />)
      const form = container.querySelector('form')

      expect(form?.getAttribute('action')).toBe('/docs')
      expect(form?.getAttribute('method')).toBe('get')
    })
  })
})
