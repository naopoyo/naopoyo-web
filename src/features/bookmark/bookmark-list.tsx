import { Link } from '@/components/link'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { client, type WebsiteListeItem } from '@/lib/hackersheet'
import { getFaviconUrl } from '@/utils'

interface BookmarkListProps {
  first: number
  after: string
  keyword?: string
}

interface BookmarkListItemProps {
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

export async function BookmarkList({ first, after, keyword }: BookmarkListProps) {
  const { websites, totalCount } = await client.getWebsites({
    first,
    after,
    filter: { keyword },
    sort: { by: 'published_at', order: 'desc' },
  })

  return (
    <>
      <Pagination totalItems={totalCount} pageSize={first} />

      <ul className="flex flex-col gap-6">
        {websites.length > 0 &&
          websites.map((website) => (
            <li key={website.id}>
              <BookmarkListItem website={website} />
            </li>
          ))}
      </ul>

      <Pagination totalItems={totalCount} pageSize={first} />
    </>
  )
}

export function BookmarkListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Pagination totalItems={1} pageSize={1} />
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton key={`bookmark-list-skeleton-${index}`} className="w-full rounded-lg">
          <div className="h-28 w-full rounded-lg"></div>
        </Skeleton>
      ))}
      <Pagination totalItems={1} pageSize={1} />
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
