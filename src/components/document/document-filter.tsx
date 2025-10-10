import SortBySelect from './sort-by-select'
import { Input } from '../ui/input'

export type DocumentFilterProps = {
  keyword?: string
  sortBy?: string
}

export default function DocumentFilter({ keyword, sortBy }: DocumentFilterProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-4
        md:flex-row
      `}
    >
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
