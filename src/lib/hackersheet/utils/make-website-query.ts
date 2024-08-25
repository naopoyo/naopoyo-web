import makeAfterCursorFromPage from './make-after-cursor-from-page'

const DEFAULT_PAGE_SIZE = 20

export interface MakeWebsiteQueryArgs {
  page?: number
  keyword?: string
}

export default function makeWebsiteQuery(props: MakeWebsiteQueryArgs) {
  const page = props.page || 1
  const first = DEFAULT_PAGE_SIZE
  const after = makeAfterCursorFromPage(page, first) ?? ''
  const keyword = props.keyword
  const suspenseKey = JSON.stringify(props)

  return { page, first, after, keyword, suspenseKey } as const
}
