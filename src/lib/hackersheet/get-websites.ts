import { OperationResult } from '@urql/core'

import { graphql } from './gql'
import { WebsitesQuery } from './gql/graphql'
import { toArrayFromEdges } from './utils'

graphql(`
  query websites {
    websites {
      totalCount
      edges {
        node {
          id
          url
          domain
          title
          description
          ogSiteName
          ogTitle
          ogType
          ogUrl
          ogDescription
          ogLocale
          ogImage {
            id
            file
            width
            height
          }
        }
      }
    }
  }
`)

export function createGetWebsitesResponse(result: OperationResult<WebsitesQuery>) {
  const websites = toArrayFromEdges(result.data?.websites?.edges)
  const totalCount = result.data?.websites?.totalCount || 0
  const isEmpty = totalCount === 0
  const error = result.error

  return { websites, totalCount, isEmpty, error } as const
}
