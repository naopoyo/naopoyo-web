import { renderHook } from '@testing-library/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'

import { useCreateQueryString } from '../use-create-query-string'

// next/navigation をモック化
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}))

const mockUsePathname = vi.mocked(usePathname)
const mockUseSearchParams = vi.mocked(useSearchParams)

describe('useCreateQueryString', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('基本的なクエリ文字列の作成', () => {
    it('URLSearchParams から基本的なクエリ文字列を作成する', () => {
      const mockParams = new URLSearchParams('foo=bar')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ baz: 'qux' })

      expect(queryString).toContain('foo=bar')
      expect(queryString).toContain('baz=qux')
    })

    it('既存パラメータを保持しながら新しいパラメータを追加する', () => {
      const mockParams = new URLSearchParams('existing=value')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ new: 'param' })

      expect(queryString).toContain('existing=value')
      expect(queryString).toContain('new=param')
    })
  })

  describe('パラメータの追加と更新', () => {
    it('既存のパラメータを更新する', () => {
      const mockParams = new URLSearchParams('key=oldValue')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ key: 'newValue' })

      expect(queryString).toContain('key=newValue')
      expect(queryString).not.toContain('oldValue')
    })

    it('複数のパラメータを同時に更新する', () => {
      const mockParams = new URLSearchParams('a=1&b=2')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ a: '10', b: '20', c: '30' })

      expect(queryString).toContain('a=10')
      expect(queryString).toContain('b=20')
      expect(queryString).toContain('c=30')
    })
  })

  describe('配列値の処理', () => {
    it('配列値を複数のパラメータに展開する', () => {
      const mockParams = new URLSearchParams()
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ tags: ['red', 'blue', 'green'] })

      expect(queryString).toContain('tags=red')
      expect(queryString).toContain('tags=blue')
      expect(queryString).toContain('tags=green')
    })

    it('既存の配列パラメータを置き換える', () => {
      const mockParams = new URLSearchParams('tags=old&tags=values')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ tags: ['new', 'array'] })

      expect(queryString).not.toContain('old')
      expect(queryString).not.toContain('values')
      expect(queryString).toContain('tags=new')
      expect(queryString).toContain('tags=array')
    })

    it('空の配列でパラメータを削除する', () => {
      const mockParams = new URLSearchParams('tags=value&keep=this')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ tags: [] })

      expect(queryString).not.toContain('tags')
      expect(queryString).toContain('keep=this')
    })
  })

  describe('パラメータの削除', () => {
    it('undefined 値でパラメータを削除する', () => {
      const mockParams = new URLSearchParams('remove=me&keep=this')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ remove: undefined })

      expect(queryString).not.toContain('remove')
      expect(queryString).toContain('keep=this')
    })

    it('複数のパラメータを同時に削除する', () => {
      const mockParams = new URLSearchParams('a=1&b=2&c=3')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ a: undefined, b: undefined })

      expect(queryString).not.toContain('a')
      expect(queryString).not.toContain('b')
      expect(queryString).toContain('c=3')
    })
  })

  describe('pathname オプション', () => {
    it('withPathname が false の場合、クエリ文字列のみ返す', () => {
      const mockParams = new URLSearchParams()
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path/to/page')

      const { result } = renderHook(() => useCreateQueryString({ withPathname: false }))
      const queryString = result.current({ key: 'value' })

      expect(queryString).toBe('key=value')
      expect(queryString).not.toContain('/path')
    })

    it('withPathname が true の場合、pathname を含める', () => {
      const mockParams = new URLSearchParams()
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path/to/page')

      const { result } = renderHook(() => useCreateQueryString({ withPathname: true }))
      const queryString = result.current({ key: 'value' })

      expect(queryString).toBe('/path/to/page?key=value')
    })

    it('デフォルトでは pathname を含めない', () => {
      const mockParams = new URLSearchParams()
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/path/to/page')

      const { result } = renderHook(() => useCreateQueryString())
      const queryString = result.current({ key: 'value' })

      expect(queryString).toBe('key=value')
      expect(queryString).not.toContain('/path')
    })

    it('pathname が含まれる場合、? で区切られている', () => {
      const mockParams = new URLSearchParams()
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/products')

      const { result } = renderHook(() => useCreateQueryString({ withPathname: true }))
      const queryString = result.current({ sort: 'name', page: '1' })

      expect(queryString).toBe('/products?sort=name&page=1')
    })
  })

  describe('複合シナリオ', () => {
    it('複数の操作を同時に実行する', () => {
      const mockParams = new URLSearchParams('existing=value&remove=this')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/search')

      const { result } = renderHook(() => useCreateQueryString({ withPathname: true }))
      const queryString = result.current({
        existing: 'updated',
        remove: undefined,
        tags: ['a', 'b'],
        new: 'parameter',
      })

      expect(queryString).toContain('/search?')
      expect(queryString).toContain('existing=updated')
      expect(queryString).not.toContain('remove')
      expect(queryString).toContain('tags=a')
      expect(queryString).toContain('tags=b')
      expect(queryString).toContain('new=parameter')
    })

    it('クエリ文字列が空の場合、パス + ? のみ返す', () => {
      const mockParams = new URLSearchParams()
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/page')

      const { result } = renderHook(() => useCreateQueryString({ withPathname: true }))
      const queryString = result.current({})

      expect(queryString).toBe('/page?')
    })

    it('複数回呼び出しで独立した結果を返す', () => {
      const mockParams = new URLSearchParams('initial=value')
      // @ts-expect-error: URLSearchParams is assignable to ReadonlyURLSearchParams
      mockUseSearchParams.mockReturnValue(mockParams)
      mockUsePathname.mockReturnValue('/page')

      const { result } = renderHook(() => useCreateQueryString())

      const first = result.current({ new: 'first' })
      const second = result.current({ new: 'second' })

      expect(first).toContain('new=first')
      expect(second).toContain('new=second')
      expect(first).not.toEqual(second)
    })
  })
})
