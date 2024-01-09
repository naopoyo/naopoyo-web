import { toArrayFromEdges } from '@/utils'

import { getClient } from './client'
import { graphql } from './gql'
import {
  ConnectionSort,
  DocumentConnectionFilter,
  DocumentsDocument,
  DocumentsQuery,
} from './gql/graphql'
import { DocumentList } from './types'

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
  const { data, error } = await getClient().query(DocumentsDocument, args ?? {})

  const documents = toModel(data)

  const totalCount = data?.documents?.totalCount || 0
  const isEmpty = totalCount === 0

  return { documents, totalCount, isEmpty, error }
}

function toModel(data?: DocumentsQuery): DocumentList {
  if (!data || !data.documents) {
    return []
  }

  const documents = data?.documents

  return toArrayFromEdges(documents?.edges).map((document) => ({
    ...document,
    tags: toArrayFromEdges(document.tags?.edges),
  }))
}
