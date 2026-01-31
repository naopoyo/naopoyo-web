import { Skeleton } from '@/components/ui/skeleton'

/**
 * DocumentArticleSkeleton コンポーネント - ドキュメント記事のローディング状態を表示します
 *
 * DocumentArticle コンポーネントのローディング中に表示されるスケルトン UI です。
 * ヘッダー（絵文字、タイトル、メタ情報）とコンテンツのプレースホルダを表示します。
 *
 * @returns ドキュメント記事のスケルトン要素
 */
export default function DocumentArticleSkeleton() {
  return (
    <>
      {/* Header skeleton */}
      <header className="flex flex-col gap-8">
        {/* Emoji & Title Section */}
        <div className="flex flex-col gap-4">
          <Skeleton className="size-18 rounded-lg" />
          <Skeleton className="h-10 w-4/5" />
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-32" />
        </div>

        {/* Tags Section */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-14 rounded-md" />
        </div>
      </header>

      {/* Content skeleton */}
      <main>
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-6 h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </main>
    </>
  )
}
