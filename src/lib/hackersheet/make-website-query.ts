import { makeAfterCursorFromPage } from './utils'

const DEFAULT_PAGE_SIZE = 20

export interface MakeWebsiteQueryArgs {
  page?: number
}

export default function makeWebsiteQuery(props: MakeWebsiteQueryArgs) {
  const page = props.page || 1
  const first = DEFAULT_PAGE_SIZE
  const after = makeAfterCursorFromPage(page, first) ?? ''
  const suspenseKey = JSON.stringify(props)

  return { page, first, after, suspenseKey } as const
}
