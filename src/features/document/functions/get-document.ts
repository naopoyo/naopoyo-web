import { graphql } from '@/gql'
import { DocumentDocument } from '@/gql/graphql'
import { getClient } from '@/urql/client'
import { nonNullableFilter } from '@/utils'

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
    (data?.document && {
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
    }) ??
    null

  return { document, error }
}
