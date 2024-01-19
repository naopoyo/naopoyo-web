import { OperationResult } from '@urql/core'

import { graphql } from './gql'
import { TagQuery } from './gql/graphql'
import { TagListItem } from './types'

graphql(`
  query tag($name: String) {
    tag(name: $name) {
      id
      name
      documentCount
      documentCountInPublished
    }
  }
`)

export interface GetTagArgs {
  name: string
}

export function createGetTagResponse(result: OperationResult<TagQuery, GetTagArgs>) {
  const tag = (result.data?.tag as TagListItem) ?? null
  const error = result.error

  return { tag, error } as const
}
