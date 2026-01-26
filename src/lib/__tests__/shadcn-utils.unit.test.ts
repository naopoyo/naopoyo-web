/**
 * @fileoverview shadcn-utils ユーティリティ関数のユニットテスト
 */

import { describe, it, expect } from 'vitest'

import { cn } from '../shadcn-utils'

describe('cn', () => {
  describe('基本的な使用方法', () => {
    it('単一の文字列クラスを返す', () => {
      expect(cn('px-2 py-1')).toBe('px-2 py-1')
    })

    it('複数の文字列クラスを結合する', () => {
      expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
    })

    it('空の入力で空文字列を返す', () => {
      expect(cn()).toBe('')
    })

    it('空の文字列を無視する', () => {
      expect(cn('px-2', '', 'py-1')).toBe('px-2 py-1')
    })
  })

  describe('Tailwind CSS クラスのマージ', () => {
    it('競合するパディングクラスをマージする', () => {
      const result = cn('px-2 py-1', 'px-3')
      expect(result).toBe('py-1 px-3')
    })

    it('競合するマージンクラスをマージする', () => {
      const result = cn('m-2', 'm-4')
      expect(result).toBe('m-4')
    })

    it('競合するテキストカラーをマージする', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('競合する背景色をマージする', () => {
      const result = cn('bg-white', 'bg-gray-100')
      expect(result).toBe('bg-gray-100')
    })

    it('複数の競合を同時に解決する', () => {
      const result = cn('px-2 py-1 text-black', 'px-4 text-white')
      expect(result).toContain('px-4')
      expect(result).toContain('py-1')
      expect(result).toContain('text-white')
    })
  })

  describe('条件付きクラス', () => {
    it('真偽値で条件付きにクラスを追加する', () => {
      expect(cn('px-2 py-1', true && 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500')
      expect(cn('px-2 py-1', false && 'bg-blue-500')).toBe('px-2 py-1')
    })

    it('複数の条件付きクラスを処理する', () => {
      const isActive = true
      const isDisabled = false
      const result = cn('px-4 py-2', isActive && 'bg-blue-500', isDisabled && 'opacity-50')
      expect(result).toContain('px-4 py-2')
      expect(result).toContain('bg-blue-500')
      expect(result).not.toContain('opacity-50')
    })

    it('undefined を無視する', () => {
      expect(cn('px-2 py-1', undefined, 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500')
    })

    it('null を無視する', () => {
      expect(cn('px-2 py-1', null, 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500')
    })
  })

  describe('オブジェクト形式のクラス', () => {
    it('オブジェクトの真値キーをクラスに変換する', () => {
      const result = cn({
        'text-red-500': true,
        'text-blue-500': false,
      })
      expect(result).toContain('text-red-500')
      expect(result).not.toContain('text-blue-500')
    })

    it('複数のオブジェクトプロパティを処理する', () => {
      const error = true
      const success = false
      const result = cn({
        'border-red-500': error,
        'border-green-500': success,
        'border-gray-300': !error && !success,
      })
      expect(result).toContain('border-red-500')
      expect(result).not.toContain('border-green-500')
    })
  })

  describe('配列形式のクラス', () => {
    it('配列のクラスを結合する', () => {
      const result = cn(['px-2', 'py-1'])
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
    })

    it('ネストされた配列を処理する', () => {
      const result = cn(['px-2', ['py-1', 'text-base']])
      expect(result).toContain('px-2')
      expect(result).toContain('py-1')
      expect(result).toContain('text-base')
    })

    it('配列内の空文字列を無視する', () => {
      const result = cn(['px-2', '', 'py-1'])
      expect(result).toMatch(/px-2.*py-1/)
    })
  })

  describe('複合的な使用方法', () => {
    it('文字列、オブジェクト、条件を組み合わせる', () => {
      const isActive = true
      const isDisabled = false
      const result = cn(
        'rounded-sm px-4 py-2',
        {
          'bg-blue-500': isActive,
          'bg-gray-300': !isActive,
        },
        isDisabled && 'opacity-50'
      )
      expect(result).toContain('px-4')
      expect(result).toContain('py-2')
      expect(result).toContain('rounded-sm')
      expect(result).toContain('bg-blue-500')
      expect(result).not.toContain('opacity-50')
    })

    it('競合するクラスがある複合的な入力を処理する', () => {
      const result = cn('px-2 py-1', { 'px-4': true }, 'text-sm', { 'text-lg': true })
      expect(result).toContain('py-1')
      expect(result).toContain('px-4')
      expect(result).toContain('text-lg')
      expect(result).not.toContain('px-2')
      expect(result).not.toContain('text-sm')
    })

    it('複数の spacing 関連クラスをマージする', () => {
      const result = cn('m-1 p-2', 'p-4', { 'm-2': true })
      expect(result).toContain('p-4')
      expect(result).toContain('m-2')
      expect(result).not.toContain('p-2')
      expect(result).not.toContain('m-1')
    })
  })

  describe('Edge cases', () => {
    it('非常に長いクラス文字列を処理する', () => {
      const longClass = 'px-1 py-1 px-2 py-2 px-3 py-3 text-xs text-sm text-base'
      const result = cn(longClass, 'text-lg')
      expect(result).toContain('px-3')
      expect(result).toContain('py-3')
      expect(result).toContain('text-lg')
    })

    it('複数回の呼び出しで一貫した結果を返す', () => {
      const input1 = 'px-2 py-1'
      const input2 = 'px-3'
      const result1 = cn(input1, input2)
      const result2 = cn(input1, input2)
      expect(result1).toBe(result2)
    })

    it('特殊文字を含むカスタムクラスを処理する', () => {
      const result = cn('data-[state=active]:bg-blue-500', 'hover:bg-blue-600')
      expect(result).toContain('data-[state=active]:bg-blue-500')
      expect(result).toContain('hover:bg-blue-600')
    })
  })
})
