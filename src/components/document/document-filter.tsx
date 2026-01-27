import { Search } from 'lucide-react'

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
    <div className="
      flex flex-col items-stretch gap-3
      sm:flex-row sm:items-center
    ">
      <SortBySelect sortBy={sortBy} />
      <form action="/docs" method="get" className="relative flex-1">
        {sortBy && <Input type="hidden" name="by" defaultValue={sortBy} />}
        <Search
          className={`
            pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2
            text-muted-foreground transition-colors
            has-focus:text-primary
          `}
          aria-hidden="true"
        />
        <Input
          className={`
            w-full min-w-64 border-border/50 bg-muted/30 pl-10 text-base transition-all duration-200
            placeholder:text-muted-foreground/60
            hover:border-border hover:bg-muted/50
            focus:border-primary/50 focus:bg-background
            focus:shadow-[0_0_0_3px_rgba(var(--primary),0.1)]
          `}
          type="search"
          name="keyword"
          defaultValue={keyword}
          placeholder="記事を検索..."
        />
      </form>
    </div>
  )
}
