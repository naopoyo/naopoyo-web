import SortBySelect from './sort-by-select'
import { Input } from '../ui/input'

export type DocumentFilterProps = {
  keyword?: string
  sortBy?: string
  totalCount?: number
}

export default function DocumentFilter({ keyword, sortBy, totalCount = 0 }: DocumentFilterProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-muted-foreground">全 {totalCount} 件</div>
      <SortBySelect sortBy={sortBy} />
      <div className="w-[348px]">
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
    </div>
  )
}
