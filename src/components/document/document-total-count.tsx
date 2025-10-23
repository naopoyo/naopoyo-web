import { getDocuments } from '@/actions'

export type DocumentTotalCountProps = {
  keyword?: string
  sortBy?: string
}

export default async function DocumentTotalCount({ keyword, sortBy }: DocumentTotalCountProps) {
  'use cache'

  const { totalCount } = await getDocuments({ keyword, sortBy })

  return <div className="text-sm text-nowrap text-muted-foreground">全 {totalCount} 件</div>
}
