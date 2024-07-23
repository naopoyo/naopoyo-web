import Image from 'next/image'

import { Link } from '@/components/link'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { client, type WebsiteListeItem } from '@/lib/hackersheet'
import { getFaviconUrl } from '@/utils'

interface BookmarkListProps {
  first: number
  after: string
}

export async function BookmarkList({ first, after }: BookmarkListProps) {
  const { websites, isEmpty, totalCount } = await client.getWebsites({ first, after })

  return (
    <>
      <Pagination totalItems={totalCount} pageSize={first} />

      <ul className="flex flex-col gap-6">
        {!isEmpty &&
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

function BookmarkListItem({ website }: { website: WebsiteListeItem }) {
  const faviconUrl = getFaviconUrl(website.domain)
  const url = website.url
  const title = website.title || website.url
  const description = website.description
  const domain = website.domain
  const ogImage = website.ogImage
  const documents = website.documents

  return (
    <div>
      <a
        href={url}
        className="flex max-h-[160px] w-full overflow-hidden rounded-lg border !no-underline hover:bg-muted/50"
      >
        <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-3">
          <div className="flex-1">
            <div className="line-clamp-4 text-sm text-foreground sm:line-clamp-2 sm:text-base">
              {title}
            </div>
          </div>
          <div className="hidden text-xs text-muted-foreground sm:line-clamp-2">{description}</div>
          <div className="flex items-center gap-2">
            <picture className="rounded-full dark:bg-foreground">
              <img src={faviconUrl} alt={`${domain} favicon`} width={16} height={16} />
            </picture>
            <div className="line-clamp-1 text-nowrap text-xs text-muted-foreground">{domain}</div>
          </div>
        </div>
        {ogImage && ogImage.fileUrl && (
          <div className="w-[30%]">
            <Image
              alt={title}
              src={ogImage.fileUrl}
              height={ogImage.height}
              width={ogImage.width}
              className="size-full object-contain object-top p-2 sm:object-cover sm:object-center sm:p-0"
            />
          </div>
        )}
      </a>
      {documents.length > 0 && (
        <div className="px-2 py-1">
          {documents.map(
            (doc) =>
              !doc.draft && (
                <div key={doc.id} className="line-clamp-1 text-nowrap text-xs">
                  <Link href={`/docs/${doc.slug}`}>↪︎ {doc.title}</Link>
                </div>
              )
          )}
        </div>
      )}
    </div>
  )
}
