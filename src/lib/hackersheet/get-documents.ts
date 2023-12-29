import { nonNullableFilter } from '@/utils'

import { getClient } from './client'
import { graphql } from './gql'
import { ConnectionSort, DocumentConnectionFilter, DocumentsDocument } from './gql/graphql'

graphql(`
  query documents(
    $after: String
    $first: Int
    $filter: DocumentConnectionFilter
    $sort: ConnectionSort
  ) {
    documents(after: $after, first: $first, filter: $filter, sort: $sort) {
      totalCount
      edges {
        node {
          id
          slug
          emoji
          title
          draft
          path
          tags {
            edges {
              node {
                id
                name
              }
            }
          }
          preview {
            id
            width
            height
            path
            fileUrl
          }
          publishedAt
          modifiedAt
        }
      }
    }
  }
`)

export interface GetDocumentsArgs {
  after?: string
  first?: number
  filter?: DocumentConnectionFilter
  sort?: ConnectionSort
}

export default async function getDocuments(args?: GetDocumentsArgs) {
  const { data, error } = await getClient().query(DocumentsDocument, {
    after: args?.after,
    first: args?.first,
    filter: args?.filter,
    sort: args?.sort,
  })

  const documents =
    data?.documents?.edges
      ?.map((document) => document?.node)
      .filter(nonNullableFilter)
      .map((document) => ({
        ...document,
        tags: document.tags?.edges?.map((tag) => tag?.node).filter(nonNullableFilter) || [],
      })) || []

  const totalCount = data?.documents?.totalCount || 0
  const isEmpty = totalCount === 0

  return { documents, totalCount, isEmpty, error }
}
