import { Link } from '@/components/navigations/link'
import { Skeleton } from '@/components/ui/skeleton'
import { client, type WebsiteListeItem } from '@/lib/hackersheet'
import { getFaviconUrl } from '@/utils'

/**
 * BookmarkItems コンポーネントの Props
 */
interface BookmarkItemsProps {
  /** 取得件数 */
  first: number
  /** ページネーションカーソル */
  after: string
  /** 検索キーワード */
  keyword?: string
}

/**
 * BookmarkListItem コンポーネントの Props
 */
interface BookmarkListItemProps {
  /** ウェブサイト情報 */
  website: WebsiteListeItem
}

const BOOKMARK_LINK_CLASS = `
  flex max-h-40 w-full overflow-hidden rounded-lg border no-underline!
  hover:bg-muted/50
`

const BOOKMARK_TITLE_CLASS = `
  line-clamp-4 text-sm text-foreground
  sm:line-clamp-2 sm:text-base
`

const BOOKMARK_DESCRIPTION_CLASS = `
  hidden text-xs text-muted-foreground
  sm:line-clamp-2
`

const BOOKMARK_FAVICON_CLASS = `
  rounded-full
  dark:bg-foreground
`

const BOOKMARK_DOMAIN_CLASS = `line-clamp-1 text-xs text-nowrap text-muted-foreground`

const BOOKMARK_OGIMAGE_CLASS = `
  size-full object-contain object-top p-2
  sm:object-cover sm:object-center sm:p-0
`

/**
 * ブックマークアイテム一覧を表示するサーバーコンポーネント
 *
 * @param props コンポーネントのProps
 * @returns ブックマークアイテムのリスト
 */
export async function BookmarkItems({ first, after, keyword }: BookmarkItemsProps) {
  const { websites } = await client.getWebsites({
    first,
    after,
    filter: { keyword },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <ul className="flex flex-col gap-6">
      {websites.length > 0 &&
        websites.map((website) => (
          <li key={website.id}>
            <BookmarkListItem website={website} />
          </li>
        ))}
    </ul>
  )
}

/**
 * ブックマークアイテム一覧のスケルトンローディング表示
 *
 * @returns スケルトンUI
 */
export function BookmarkItemsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={`bookmark-items-skeleton-${index}`} className="w-full rounded-lg">
          <div className="h-28 w-full rounded-lg"></div>
        </Skeleton>
      ))}
    </div>
  )
}

function BookmarkListItem({ website }: BookmarkListItemProps) {
  const { domain, url, title, description, ogImage, documents } = website

  return (
    <div>
      <a href={url} className={BOOKMARK_LINK_CLASS}>
        <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-3">
          <div className="flex-1">
            <div className={BOOKMARK_TITLE_CLASS}>{title || url}</div>
          </div>
          <div className={BOOKMARK_DESCRIPTION_CLASS}>{description}</div>
          <div className="flex items-center gap-2">
            <picture className={BOOKMARK_FAVICON_CLASS}>
              <img src={getFaviconUrl(domain)} alt={`${domain} favicon`} width={16} height={16} />
            </picture>
            <div className={BOOKMARK_DOMAIN_CLASS}>{domain}</div>
          </div>
        </div>
        {ogImage?.fileUrl && (
          <picture className="w-[30%]">
            <img
              alt={title || url}
              src={ogImage.fileUrl}
              height={ogImage.height}
              width={ogImage.width}
              className={BOOKMARK_OGIMAGE_CLASS}
            />
          </picture>
        )}
      </a>
      {documents.length > 0 && (
        <div className="px-2 py-1">
          {documents
            .filter((doc) => !doc.draft)
            .map((doc) => (
              <div key={doc.id} className="line-clamp-1 text-xs text-nowrap">
                <Link href={`/docs/${doc.slug}`}>↪︎ {doc.title}</Link>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
