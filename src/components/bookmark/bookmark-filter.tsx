import { Input } from '../ui/input'

export type BookmarkFilterProps = {
  keyword?: string
}

export default function BookmarkFilter({ keyword }: BookmarkFilterProps) {
  return (
    <form action="/bookmarks" method="get" className="w-full">
      <Input
        className="text-base"
        type="search"
        name="keyword"
        defaultValue={keyword}
        placeholder="キーワードを入力して検索"
        aria-label="ブックマーク検索キーワード"
      />
    </form>
  )
}
