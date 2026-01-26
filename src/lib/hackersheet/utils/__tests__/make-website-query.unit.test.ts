import { describe, it, expect } from 'vitest'

import makeWebsiteQuery from '../make-website-query'

describe('makeWebsiteQuery', () => {
  describe('基本動作', () => {
    it('デフォルト値を使用してクエリを構築する', () => {
      const result = makeWebsiteQuery({})
      expect(result.page).toBe(1)
      expect(result.first).toBe(20)
      expect(result.after).toBe('')
      expect(result.keyword).toBeUndefined()
    })

    it('ページ番号を指定してクエリを構築する', () => {
      const result = makeWebsiteQuery({ page: 2 })
      expect(result.page).toBe(2)
      expect(result.first).toBe(20)
      expect(result.after).toBe('MjA=')
      expect(result.keyword).toBeUndefined()
    })

    it('キーワードを指定してクエリを構築する', () => {
      const result = makeWebsiteQuery({ keyword: 'test' })
      expect(result.page).toBe(1)
      expect(result.first).toBe(20)
      expect(result.after).toBe('')
      expect(result.keyword).toBe('test')
    })

    it('ページとキーワードの両方を指定してクエリを構築する', () => {
      const result = makeWebsiteQuery({ page: 3, keyword: 'query' })
      expect(result.page).toBe(3)
      expect(result.first).toBe(20)
      expect(result.after).toBe('NDA=')
      expect(result.keyword).toBe('query')
    })
  })

  describe('サスペンスキー', () => {
    it('同じ引数でクエリを構築すると同じサスペンスキーが返される', () => {
      const props = { page: 2, keyword: 'test' }
      const result1 = makeWebsiteQuery(props)
      const result2 = makeWebsiteQuery(props)
      expect(result1.suspenseKey).toBe(result2.suspenseKey)
    })

    it('異なる引数でクエリを構築すると異なるサスペンスキーが返される', () => {
      const result1 = makeWebsiteQuery({ page: 1 })
      const result2 = makeWebsiteQuery({ page: 2 })
      expect(result1.suspenseKey).not.toBe(result2.suspenseKey)
    })

    it('サスペンスキーは JSON 形式の文字列である', () => {
      const result = makeWebsiteQuery({ page: 2, keyword: 'test' })
      expect(typeof result.suspenseKey).toBe('string')
      const parsed = JSON.parse(result.suspenseKey)
      expect(parsed.page).toBe(2)
      expect(parsed.keyword).toBe('test')
    })
  })

  describe('戻り値の型', () => {
    it('戻り値は const として扱われる', () => {
      const result = makeWebsiteQuery({ page: 1 })
      expect(result.page).toBe(1)
      expect(result.first).toBe(20)
      expect(typeof result.after).toBe('string')
    })

    it('first は常に 20 である', () => {
      const result1 = makeWebsiteQuery({})
      const result2 = makeWebsiteQuery({ page: 5 })
      const result3 = makeWebsiteQuery({ keyword: 'test' })
      expect(result1.first).toBe(20)
      expect(result2.first).toBe(20)
      expect(result3.first).toBe(20)
    })
  })

  describe('ページネーション', () => {
    it('ページが 0 以下の場合は 1 として扱われる', () => {
      const result = makeWebsiteQuery({ page: 0 })
      expect(result.page).toBe(0 || 1)
    })

    it('undefined ページは 1 として扱われる', () => {
      const result = makeWebsiteQuery({ page: undefined })
      expect(result.page).toBe(1)
    })

    it('カーソルはページサイズに基づいて正しく計算される', () => {
      const result1 = makeWebsiteQuery({ page: 1 })
      const result2 = makeWebsiteQuery({ page: 2 })
      const result3 = makeWebsiteQuery({ page: 3 })
      expect(result1.after).toBe('')
      expect(result2.after).toBe('MjA=')
      expect(result3.after).toBe('NDA=')
    })
  })
})
