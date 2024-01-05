/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query document($slug: String) {\n    document(slug: $slug) {\n      id\n      slug\n      emoji\n      title\n      draft\n      content\n      path\n      tags {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n      preview {\n        id\n        width\n        height\n        path\n        fileUrl\n      }\n      publishedAt\n      modifiedAt\n      outboundLinkDocuments {\n        edges {\n          node {\n            id\n            slug\n            emoji\n            title\n            draft\n            path\n            tags {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            publishedAt\n            modifiedAt\n          }\n        }\n      }\n      inboundLinkDocuments {\n        edges {\n          node {\n            id\n            slug\n            emoji\n            title\n            draft\n            path\n            tags {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            publishedAt\n            modifiedAt\n          }\n        }\n      }\n      websites {\n        edges {\n          node {\n            id\n            url\n            domain\n            title\n            description\n            ogSiteName\n            ogTitle\n            ogType\n            ogUrl\n            ogDescription\n            ogLocale\n            ogImage {\n              id\n              file\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n':
    types.DocumentDocument,
  '\n  query documents(\n    $after: String\n    $first: Int\n    $filter: DocumentConnectionFilter\n    $sort: ConnectionSort\n  ) {\n    documents(after: $after, first: $first, filter: $filter, sort: $sort) {\n      totalCount\n      edges {\n        node {\n          id\n          slug\n          emoji\n          title\n          draft\n          path\n          tags {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n          preview {\n            id\n            width\n            height\n            path\n            fileUrl\n          }\n          publishedAt\n          modifiedAt\n        }\n      }\n    }\n  }\n':
    types.DocumentsDocument,
  '\n  query tag($name: String) {\n    tag(name: $name) {\n      id\n      name\n      documentCount\n      documentCountInPublished\n    }\n  }\n':
    types.TagDocument,
  '\n  query tags($sort: ConnectionSort) {\n    tags(sort: $sort) {\n      totalCount\n      edges {\n        node {\n          id\n          name\n          documentCount\n          documentCountInPublished\n        }\n      }\n    }\n  }\n':
    types.TagsDocument,
  '\n  query websites {\n    websites {\n      totalCount\n      edges {\n        node {\n          id\n          url\n          domain\n          title\n          description\n          ogSiteName\n          ogTitle\n          ogType\n          ogUrl\n          ogDescription\n          ogLocale\n          ogImage {\n            id\n            file\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n':
    types.WebsitesDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query document($slug: String) {\n    document(slug: $slug) {\n      id\n      slug\n      emoji\n      title\n      draft\n      content\n      path\n      tags {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n      preview {\n        id\n        width\n        height\n        path\n        fileUrl\n      }\n      publishedAt\n      modifiedAt\n      outboundLinkDocuments {\n        edges {\n          node {\n            id\n            slug\n            emoji\n            title\n            draft\n            path\n            tags {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            publishedAt\n            modifiedAt\n          }\n        }\n      }\n      inboundLinkDocuments {\n        edges {\n          node {\n            id\n            slug\n            emoji\n            title\n            draft\n            path\n            tags {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            publishedAt\n            modifiedAt\n          }\n        }\n      }\n      websites {\n        edges {\n          node {\n            id\n            url\n            domain\n            title\n            description\n            ogSiteName\n            ogTitle\n            ogType\n            ogUrl\n            ogDescription\n            ogLocale\n            ogImage {\n              id\n              file\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query document($slug: String) {\n    document(slug: $slug) {\n      id\n      slug\n      emoji\n      title\n      draft\n      content\n      path\n      tags {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n      preview {\n        id\n        width\n        height\n        path\n        fileUrl\n      }\n      publishedAt\n      modifiedAt\n      outboundLinkDocuments {\n        edges {\n          node {\n            id\n            slug\n            emoji\n            title\n            draft\n            path\n            tags {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            publishedAt\n            modifiedAt\n          }\n        }\n      }\n      inboundLinkDocuments {\n        edges {\n          node {\n            id\n            slug\n            emoji\n            title\n            draft\n            path\n            tags {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            publishedAt\n            modifiedAt\n          }\n        }\n      }\n      websites {\n        edges {\n          node {\n            id\n            url\n            domain\n            title\n            description\n            ogSiteName\n            ogTitle\n            ogType\n            ogUrl\n            ogDescription\n            ogLocale\n            ogImage {\n              id\n              file\n              width\n              height\n            }\n          }\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query documents(\n    $after: String\n    $first: Int\n    $filter: DocumentConnectionFilter\n    $sort: ConnectionSort\n  ) {\n    documents(after: $after, first: $first, filter: $filter, sort: $sort) {\n      totalCount\n      edges {\n        node {\n          id\n          slug\n          emoji\n          title\n          draft\n          path\n          tags {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n          preview {\n            id\n            width\n            height\n            path\n            fileUrl\n          }\n          publishedAt\n          modifiedAt\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query documents(\n    $after: String\n    $first: Int\n    $filter: DocumentConnectionFilter\n    $sort: ConnectionSort\n  ) {\n    documents(after: $after, first: $first, filter: $filter, sort: $sort) {\n      totalCount\n      edges {\n        node {\n          id\n          slug\n          emoji\n          title\n          draft\n          path\n          tags {\n            edges {\n              node {\n                id\n                name\n              }\n            }\n          }\n          preview {\n            id\n            width\n            height\n            path\n            fileUrl\n          }\n          publishedAt\n          modifiedAt\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query tag($name: String) {\n    tag(name: $name) {\n      id\n      name\n      documentCount\n      documentCountInPublished\n    }\n  }\n'
): (typeof documents)['\n  query tag($name: String) {\n    tag(name: $name) {\n      id\n      name\n      documentCount\n      documentCountInPublished\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query tags($sort: ConnectionSort) {\n    tags(sort: $sort) {\n      totalCount\n      edges {\n        node {\n          id\n          name\n          documentCount\n          documentCountInPublished\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query tags($sort: ConnectionSort) {\n    tags(sort: $sort) {\n      totalCount\n      edges {\n        node {\n          id\n          name\n          documentCount\n          documentCountInPublished\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query websites {\n    websites {\n      totalCount\n      edges {\n        node {\n          id\n          url\n          domain\n          title\n          description\n          ogSiteName\n          ogTitle\n          ogType\n          ogUrl\n          ogDescription\n          ogLocale\n          ogImage {\n            id\n            file\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query websites {\n    websites {\n      totalCount\n      edges {\n        node {\n          id\n          url\n          domain\n          title\n          description\n          ogSiteName\n          ogTitle\n          ogType\n          ogUrl\n          ogDescription\n          ogLocale\n          ogImage {\n            id\n            file\n            width\n            height\n          }\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
