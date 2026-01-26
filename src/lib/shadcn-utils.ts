/**
 * @module shadcn-utils
 * @description Tailwind CSS クラス名を結合・マージするユーティリティモジュール
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS と clsx を使用してクラス名を結合し、競合するクラス名を自動的にマージします。
 *
 * @param inputs - 結合するクラス値（文字列、オブジェクト、配列、条件式など）
 * @returns マージされたクラス名文字列
 *
 * @example
 * ```tsx
 * // 基本的な使用方法
 * cn('px-2 py-1', 'px-3')  // => 'py-1 px-3'
 *
 * // 条件付きクラス
 * cn('base-class', isActive && 'active-class', disabled && 'disabled')
 *
 * // オブジェクト形式
 * cn({ 'text-red': error, 'text-green': success })
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
