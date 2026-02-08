/**
 * @fileoverview shadcn-utils ユーティリティ関数のユニットテスト
 */

import { describe, it, expect } from 'vitest'

import { cn } from '../shadcn-utils'

describe('cn', () => {
  it('複数のクラスを結合する', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('falsy 値を無視する', () => {
    expect(cn('px-2', false && 'hidden', null, undefined, '')).toBe('px-2')
  })

  it('競合する Tailwind クラスを後勝ちでマージする', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })
})
