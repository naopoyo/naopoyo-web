import SortBySelect from './sort-by-select'
import { Input } from '../ui/input'

/**
 * DocumentFilter コンポーネントの Props
 *
 * @property {string} [keyword] - 検索キーワード
 * @property {string} [sortBy] - ドキュメントのソート順
 */
export type DocumentFilterProps = {
  /** 検索キーワード */
  keyword?: string
  /** ドキュメントのソート順（'published_at' または 'modified_at'） */
  sortBy?: string
}

const FILTER_CONTAINER_CLASS = `
  flex flex-col items-center justify-center gap-4
  md:flex-row
`

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
    <div className={FILTER_CONTAINER_CLASS}>
      <SortBySelect sortBy={sortBy} />
      <form action="/docs" method="get">
        {sortBy && <Input type="hidden" name="by" defaultValue={sortBy} />}
        <Input
          className="text-base"
          type="search"
          name="keyword"
          defaultValue={keyword}
          placeholder="キーワードを入力して検索"
        />
      </form>
    </div>
  )
}
