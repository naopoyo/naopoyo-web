import { graphql } from '@/gql'
import { TagsDocument } from '@/gql/graphql'
import { getClient } from '@/urql/client'
import { nonNullableFilter } from '@/utils'

graphql(`
  query tags {
    tags {
      totalCount
      edges {
        node {
          id
          name
          documentCount
        }
      }
    }
  }
`)

export default async function getTags() {
  const { data, error } = await getClient().query(TagsDocument, {})

  const tags = data?.tags?.edges?.map((tag) => tag?.node).filter(nonNullableFilter) || []

  const totalCount = data?.tags?.totalCount || 0
  const isEmpty = totalCount === 0

  return { tags, totalCount, isEmpty, error }
}
