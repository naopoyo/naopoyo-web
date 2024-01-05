import { nonNullableFilter } from '@/utils'

import { getClient } from './client'
import { graphql } from './gql'
import { WebsitesDocument } from './gql/graphql'

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

export default async function getWebsites() {
  const { data, error } = await getClient().query(WebsitesDocument, {})

  const websites =
    data?.websites?.edges?.map((website) => website?.node).filter(nonNullableFilter) || []

  const totalCount = data?.websites?.totalCount || 0
  const isEmpty = totalCount === 0

  return { websites, totalCount, isEmpty, error }
}
