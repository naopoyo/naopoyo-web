/**
 * px/rem コンバーターツールのユーティリティ関数
 */

import { DEFAULT_BASE_PX } from './constants'

/**
 * px を rem に変換する
 *
 * @param px - ピクセル値
 * @param basePx - ベースピクセル値（デフォルト: 16）
 * @returns rem 値
 */
export function pxToRem(px: number, basePx: number = DEFAULT_BASE_PX): string {
  if (isNaN(px) || isNaN(basePx) || basePx <= 0) {
    return ''
  }
  return (px / basePx).toString()
}

/**
 * rem を px に変換する
 *
 * @param rem - rem 値
 * @param basePx - ベースピクセル値（デフォルト: 16）
 * @returns ピクセル値
 */
export function remToPx(rem: number, basePx: number = DEFAULT_BASE_PX): string {
  if (isNaN(rem) || isNaN(basePx) || basePx <= 0) {
    return ''
  }
  return (rem * basePx).toString()
}

/**
 * クリップボードにテキストをコピーする
 *
 * @param value - コピーする値
 * @param unit - 単位（'px' または 'rem'）
 */
export function copyToClipboard(value: string, unit: string): void {
  if (value && unit && navigator.clipboard) {
    navigator.clipboard.writeText(`${value}${unit}`)
  }
}
