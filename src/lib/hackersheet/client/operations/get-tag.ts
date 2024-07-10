import { OperationResult } from '@urql/core'

import { graphql } from '../../gql'
import { QueryTagArgs, TagQuery } from '../../gql/graphql'
import { TagListItem } from '../../types'
import { toArrayFromEdges } from '../../utils'

graphql(`
  query tag($name: String) {
    tag(name: $name) {
      id
      name
      documentCount
      documentCountInPublished
      relatedTags {
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
  }
`)

export function makeGetTagResponse(result: OperationResult<TagQuery, QueryTagArgs>) {
  const tmpTag = result.data?.tag
  const tag: TagListItem | null = tmpTag
    ? { ...tmpTag, relatedTags: toArrayFromEdges(tmpTag.relatedTags?.edges) }
    : null
  const error = result.error

  return { tag, error } as const
}
