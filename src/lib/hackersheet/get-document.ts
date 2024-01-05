import { nonNullableFilter } from '@/utils'

import { getClient } from './client'
import { graphql } from './gql'
import { DocumentDocument } from './gql/graphql'
import { Document } from './types'

graphql(`
  query document($slug: String) {
    document(slug: $slug) {
      id
      slug
      emoji
      title
      draft
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
      preview {
        id
        width
        height
        path
        fileUrl
      }
      publishedAt
      modifiedAt
      outboundLinkDocuments {
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
            publishedAt
            modifiedAt
          }
        }
      }
      inboundLinkDocuments {
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
            publishedAt
            modifiedAt
          }
        }
      }
      websites {
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
  }
`)

export interface GetDocumentArgs {
  slug: string
}

export default async function getDocument({ slug }: GetDocumentArgs) {
  const { data, error } = await getClient().query(DocumentDocument, {
    slug: slug,
  })

  const document =
    ((data?.document && {
      ...data.document,
      tags: data.document.tags?.edges?.map((tag) => tag?.node).filter(nonNullableFilter) ?? [],
      outboundLinkDocuments:
        data.document.outboundLinkDocuments?.edges
          ?.map((doc) => doc?.node)
          .filter(nonNullableFilter)
          .map((doc) => ({
            ...doc,
            tags: doc.tags?.edges?.map((tag) => tag?.node).filter(nonNullableFilter) ?? [],
          })) ?? [],
      inboundLinkDocuments:
        data.document.inboundLinkDocuments?.edges
          ?.map((doc) => doc?.node)
          .filter(nonNullableFilter)
          .map((doc) => ({
            ...doc,
            tags: doc.tags?.edges?.map((tag) => tag?.node).filter(nonNullableFilter) ?? [],
          })) ?? [],
      websites: data.document.websites?.edges
        ?.map((website) => website?.node)
        .filter(nonNullableFilter),
    }) as Document) ?? null

  return { document, error }
}
