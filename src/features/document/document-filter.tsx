import { SearchInput } from '@/components/search-input'

import SortBySelect from './sort-by-select'
import { Input } from '../ui/input'

/**
 * DocumentFilter コンポーネントの Props
 */
export type DocumentFilterProps = {
  /** 検索キーワード */
  keyword?: string
  /** ドキュメントのソート順（'published_at' または 'modified_at'） */
  sortBy?: string
}

/**
 * DocumentFilter コンポーネント - ドキュメント一覧の検索とソート機能を提供します
 *
 * キーワード検索とソート順の変更を行えるフィルター機能を提供します。
 * 検索とソート順の変更は GET フォームで /docs エンドポイントに送信されます。
 *
 * @param props - DocumentFilterProps
 * @returns 検索入力とソート順選択を含むフィルターフォーム要素
 */
export default function DocumentFilter({ keyword, sortBy }: DocumentFilterProps) {
  return (
    <div
      className={`
        flex flex-col items-stretch gap-3
        sm:flex-row sm:items-center
      `}
    >
      <SortBySelect sortBy={sortBy} />
      <form action="/docs" method="get" className="flex-1">
        {sortBy && <Input type="hidden" name="by" defaultValue={sortBy} />}
        <SearchInput
          className="min-w-64"
          name="keyword"
          defaultValue={keyword}
          placeholder="記事を検索..."
        />
      </form>
    </div>
  )
}
