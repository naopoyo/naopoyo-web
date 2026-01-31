import { createLoader, createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

/**
 * ブックマークページのクエリパラメータ定義
 *
 * - page: ページ番号（デフォルト: 1）
 * - keyword: 検索キーワード（デフォルト: 空文字列）
 */
export const bookmarkSearchParams = {
  page: parseAsInteger.withDefault(1),
  keyword: parseAsString.withDefault(''),
}

/**
 * サーバーサイドでクエリパラメータを解析するためのローダー
 */
export const loadBookmarkSearchParams = createLoader(bookmarkSearchParams)

/**
 * RSCツリー全体でクエリパラメータにアクセスするためのキャッシュ
 */
export const bookmarkSearchParamsCache = createSearchParamsCache(bookmarkSearchParams)
