import { graphql } from '@/gql'
import { ConnectionSort, DocumentConnectionFilter, DocumentsDocument } from '@/gql/graphql'
import { getClient } from '@/urql/client'
import { nonNullableFilter } from '@/utils'

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
          rawContent
          content
          path
          tags {
            edges {
              node {
                id
                name
              }
            }
          }
          publishedAt
          modifiedAt
          createdAt
          updatedAt
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

export default async function getDocuments({ after, first, filter, sort }: GetDocumentsArgs) {
  const { data, error } = await getClient().query(DocumentsDocument, {
    after: after,
    first: first,
    filter: filter,
    sort: sort,
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
