/**
 * makeAfterCursorFromPage
 *
 * ページネーション用のカーソル値を生成します。
 * ページ番号とページサイズから、オフセット値をBase64エンコードしたカーソルを返します。
 * 1ページ目（after === 0）の場合は undefined を返します。
 *
 * @param page ページ番号（1始まり）
 * @param first ページサイズ
 * @returns Base64エンコードされたカーソル値、または undefined（1ページ目の場合）
 */
export default function makeAfterCursorFromPage(page: number, first: number): string | undefined {
  const after = (page - 1) * first
  if (after === 0) {
    return undefined
  }
  return Buffer.from(after.toString()).toString('base64')
}
