import { createSearchParamsCache, parseAsString } from 'nuqs/server'

/**
 * ドキュメントページのクエリパラメータ定義
 *
 * - keyword: 検索キーワード（デフォルト: 空文字列）
 * - by: ソート順（デフォルト: 空文字列、published_at として扱われる）
 */
export const documentSearchParams = {
  keyword: parseAsString.withDefault(''),
  by: parseAsString.withDefault(''),
}

/**
 * RSCツリー全体でクエリパラメータにアクセスするためのキャッシュ
 */
export const documentSearchParamsCache = createSearchParamsCache(documentSearchParams)
