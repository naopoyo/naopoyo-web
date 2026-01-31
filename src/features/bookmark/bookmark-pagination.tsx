import { Pagination } from '@/components/controls/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { client } from '@/lib/hackersheet'

/**
 * BookmarkPagination コンポーネントの Props
 */
interface BookmarkPaginationProps {
  /** ページサイズ */
  first: number
  /** 検索キーワード */
  keyword?: string
}

/**
 * ブックマークページネーションを表示するサーバーコンポーネント
 *
 * キーワードのみに依存するため、ページ遷移時には再レンダリングされません。
 *
 * @param props コンポーネントのProps
 * @returns ページネーションコンポーネント
 */
export async function BookmarkPagination({ first, keyword }: BookmarkPaginationProps) {
  const { totalCount } = await client.getWebsites({
    first: 1,
    after: '',
    filter: { keyword },
    sort: { by: 'published_at', order: 'desc' },
  })

  return <Pagination totalItems={totalCount} pageSize={first} />
}

/**
 * ブックマークページネーションのスケルトンローディング表示
 *
 * @returns スケルトンUI
 */
export function BookmarkPaginationSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-24 rounded-sm" />
      <Skeleton className="h-9 w-48 rounded-sm" />
    </div>
  )
}
