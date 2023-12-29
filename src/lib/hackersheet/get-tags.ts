import { nonNullableFilter } from '@/utils'

import { getClient } from './client'
import { graphql } from './gql'
import { ConnectionSort, TagsDocument } from './gql/graphql'

graphql(`
  query tags($sort: ConnectionSort) {
    tags(sort: $sort) {
      totalCount
      edges {
        node {
          id
          name
          documentCount
          documentCountInPublished
        }
      }
    }
  }
`)

export interface GetTagsArgs {
  sort: ConnectionSort
}

export default async function getTags(args?: GetTagsArgs) {
  const { data, error } = await getClient().query(TagsDocument, { sort: args?.sort })

  const tags = data?.tags?.edges?.map((tag) => tag?.node).filter(nonNullableFilter) || []

  const totalCount = data?.tags?.totalCount || 0
  const isEmpty = totalCount === 0

  return { tags, totalCount, isEmpty, error }
}
