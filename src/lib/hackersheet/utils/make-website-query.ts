import makeAfterCursorFromPage from './make-after-cursor-from-page'

/**
 * デフォルトページサイズ
 * @internal
 */
const DEFAULT_PAGE_SIZE = 20

/**
 * makeWebsiteQuery の引数型
 */
export interface MakeWebsiteQueryArgs {
  page?: number
  keyword?: string
}

/**
 * makeWebsiteQuery
 *
 * ウェブサイト検索クエリを構築します。
 * ページネーション情報、キーワード、キャッシュ用のサスペンスキーを含むオブジェクトを返します。
 *
 * @param props クエリ構築用の引数（ページ番号、キーワード）
 * @returns ページ、ページサイズ、カーソル、キーワード、サスペンスキーを含むオブジェクト
 */
export default function makeWebsiteQuery(props: MakeWebsiteQueryArgs) {
  const page = props.page || 1
  const first = DEFAULT_PAGE_SIZE
  const after = makeAfterCursorFromPage(page, first) ?? ''
  const keyword = props.keyword
  const itemsSuspenseKey = JSON.stringify(props)
  const paginationSuspenseKey = JSON.stringify({ keyword })

  return { page, first, after, keyword, itemsSuspenseKey, paginationSuspenseKey } as const
}
