/**
 * ランダム絵文字生成ツールのユーティリティ関数
 */

/**
 * クリップボードにテキストをコピーする
 *
 * Clipboard API を使用してテキストをクリップボードにコピーします
 *
 * @param value - コピーする値
 */
export function copyToClipboard(value: string): void {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(value)
  }
}
