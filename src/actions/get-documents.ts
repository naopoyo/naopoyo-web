import { client } from '@/lib/hackersheet'

export type GetDocumentsArgs = {
  keyword?: string
  sortBy?: string
}

export default async function getDocuments({ keyword, sortBy }: GetDocumentsArgs) {
  return await client.getDocuments({
    filter: { draft: false, keyword: keyword },
    sort: { by: sortBy, order: 'desc' },
  })
}
