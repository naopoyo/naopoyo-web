import { toArrayFromEdges } from '@/utils'

import { getClient } from './client'
import { graphql } from './gql'
import { DocumentDocument, DocumentQuery } from './gql/graphql'
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
      assets {
        edges {
          node {
            id
            path
            name
            fileUrl
            height
            width
          }
        }
      }
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

  const document = toModel(data)

  return { document, error }
}

function toModel(data?: DocumentQuery): Document | null {
  if (!data || !data.document) {
    return null
  }

  const document = data.document

  return {
    ...document,
    tags: toArrayFromEdges(document.tags?.edges),
    assets: toArrayFromEdges(document.assets?.edges),
    outboundLinkDocuments: toArrayFromEdges(document.outboundLinkDocuments?.edges).map((doc) => ({
      ...doc,
      tags: toArrayFromEdges(doc.tags?.edges),
    })),
    inboundLinkDocuments: toArrayFromEdges(document.inboundLinkDocuments?.edges).map((doc) => ({
      ...doc,
      tags: toArrayFromEdges(doc.tags?.edges),
    })),
    websites: toArrayFromEdges(document.websites?.edges),
  } as Document
}
