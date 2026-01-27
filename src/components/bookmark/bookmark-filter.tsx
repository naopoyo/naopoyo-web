import { SearchInput } from '@/components/search-input'

/**
 * BookmarkFilter コンポーネントの Props
 */
export type BookmarkFilterProps = {
  /** 検索キーワード */
  keyword?: string
}

/**
 * BookmarkFilter コンポーネント - ブックマーク一覧の検索機能を提供します
 *
 * キーワード検索を行えるフィルター機能を提供します。
 * 検索は GET フォームで /bookmarks エンドポイントに送信されます。
 *
 * @param props - BookmarkFilterProps
 * @returns 検索入力を含むフィルターフォーム要素
 */
export default function BookmarkFilter({ keyword }: BookmarkFilterProps) {
  return (
    <form action="/bookmarks" method="get" className="w-full">
      <SearchInput
        name="keyword"
        defaultValue={keyword}
        placeholder="ブックマークを検索..."
        aria-label="ブックマーク検索キーワード"
      />
    </form>
  )
}
