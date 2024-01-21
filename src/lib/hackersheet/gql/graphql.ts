/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** DateTime */
  DateTime: { input: any; output: any }
}

export type Asset = {
  __typename?: 'Asset'
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output']
  /** The file size of the asset. */
  fileSize: Scalars['Int']['output']
  /** The HTTP URL listing the asset file. */
  fileUrl: Scalars['String']['output']
  /** The height of the asset file. */
  height: Scalars['Int']['output']
  id: Scalars['ID']['output']
  /** The name of the asset. */
  name: Scalars['String']['output']
  /** the origin file path of the asset. */
  path?: Maybe<Scalars['String']['output']>
  /** Identifies the date and time when the object was updated. */
  updatedAt: Scalars['DateTime']['output']
  /** The width of the asset file. */
  width: Scalars['Int']['output']
}

/** The connection type for Asset. */
export type AssetConnection = {
  __typename?: 'AssetConnection'
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AssetEdge>>>
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Asset>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** Total count of nodes. */
  totalCount: Scalars['Int']['output']
}

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of the edge. */
  node?: Maybe<Asset>
}

/** Args for sort of connection. */
export type ConnectionSort = {
  /** Sort by. */
  by?: InputMaybe<Scalars['String']['input']>
  /** Sort order. */
  order?: InputMaybe<Scalars['String']['input']>
}

export type Document = {
  __typename?: 'Document'
  /** A list of assets associated with the object. */
  assets?: Maybe<AssetConnection>
  /** The content of the document. */
  content: Scalars['String']['output']
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output']
  /** Whether the document is draft. */
  draft: Scalars['Boolean']['output']
  /** The emoji of the document. */
  emoji: Scalars['String']['output']
  id: Scalars['ID']['output']
  /** A list of documents linking this document. */
  inboundLinkDocuments?: Maybe<DocumentConnection>
  /** Identifies the date and time when the object was modified. */
  modifiedAt: Scalars['DateTime']['output']
  /** A list of documents linked from this document. */
  outboundLinkDocuments?: Maybe<DocumentConnection>
  /** the origin file path of the document. */
  path?: Maybe<Scalars['String']['output']>
  /** Asset set as preview. */
  preview?: Maybe<Asset>
  /** Identifies the date and time when the object was published. */
  publishedAt: Scalars['DateTime']['output']
  /** The raw content of the document. */
  rawContent: Scalars['String']['output']
  /** The slug of the document. */
  slug: Scalars['String']['output']
  /** A list of tags associated with the object. */
  tags?: Maybe<TagConnection>
  /** The title of the document. */
  title: Scalars['String']['output']
  /** Identifies the date and time when the object was updated. */
  updatedAt: Scalars['DateTime']['output']
  /** A list of websites associated with the object. */
  websites?: Maybe<WebsiteConnection>
}

export type DocumentAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type DocumentInboundLinkDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type DocumentOutboundLinkDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type DocumentTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type DocumentWebsitesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

/** The connection type for Document. */
export type DocumentConnection = {
  __typename?: 'DocumentConnection'
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<DocumentEdge>>>
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Document>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** Total count of nodes. */
  totalCount: Scalars['Int']['output']
}

/** Args for filter of document connection. */
export type DocumentConnectionFilter = {
  /** End of date and time the document was created. */
  createdAtEnd?: InputMaybe<Scalars['DateTime']['input']>
  /** Start of date and time the document was created. */
  createdAtStart?: InputMaybe<Scalars['DateTime']['input']>
  /** Indicates whether it is a draft. */
  draft?: InputMaybe<Scalars['Boolean']['input']>
  /** Slugs excluded in the document. */
  excludeSlugs?: InputMaybe<Array<Scalars['String']['input']>>
  /** Tags excluded in the document. */
  excludeTags?: InputMaybe<Array<Scalars['String']['input']>>
  /** The keyword inclued in the document. */
  keyword?: InputMaybe<Scalars['String']['input']>
  /** End of date and time the document was modified. */
  modifiedAtEnd?: InputMaybe<Scalars['DateTime']['input']>
  /** Start of date and time the document was modified. */
  modifiedAtStart?: InputMaybe<Scalars['DateTime']['input']>
  /** End of date and time the document was published. */
  publishedAtEnd?: InputMaybe<Scalars['DateTime']['input']>
  /** Start of date and time the document was published. */
  publishedAtStart?: InputMaybe<Scalars['DateTime']['input']>
  /** Tags included in the document. */
  tags?: InputMaybe<Array<Scalars['String']['input']>>
  /** Indicates that the tag is not included. */
  tagsNone?: InputMaybe<Scalars['Boolean']['input']>
  /** End of date and time the document was updated. */
  updatedAtEnd?: InputMaybe<Scalars['DateTime']['input']>
  /** Start of date and time the document was updated. */
  updatedAtStart?: InputMaybe<Scalars['DateTime']['input']>
}

/** An edge in a connection. */
export type DocumentEdge = {
  __typename?: 'DocumentEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of the edge. */
  node?: Maybe<Document>
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  /** Find a asset associated with the workspace by either `ID` or `path`. */
  asset?: Maybe<Asset>
  /** A list of assets associated with the workspace. */
  assets?: Maybe<AssetConnection>
  /** Find a document associated with the workspace by either `ID`, `slug` or `path`. */
  document?: Maybe<Document>
  /** A list of documents associated with the workspace. */
  documents?: Maybe<DocumentConnection>
  /** Find a tag associated with the workspace by either `ID` or `name`. */
  tag?: Maybe<Tag>
  /** A list of tags associated with the workspace. */
  tags?: Maybe<TagConnection>
  /** Find a website associated with the workspace by `ID`. */
  website?: Maybe<Website>
  /** A list of websites associated with the workspace. */
  websites?: Maybe<WebsiteConnection>
}

export type QueryAssetArgs = {
  id?: InputMaybe<Scalars['String']['input']>
  path?: InputMaybe<Scalars['String']['input']>
}

export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ConnectionSort>
}

export type QueryDocumentArgs = {
  id?: InputMaybe<Scalars['String']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type QueryDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filter?: InputMaybe<DocumentConnectionFilter>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ConnectionSort>
}

export type QueryTagArgs = {
  id?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type QueryTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<ConnectionSort>
}

export type QueryWebsiteArgs = {
  id: Scalars['String']['input']
}

export type QueryWebsitesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

export type Tag = {
  __typename?: 'Tag'
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output']
  /** Number of documents with this tag. */
  documentCount: Scalars['Int']['output']
  /** Number of documents in published with this tag. */
  documentCountInPublished: Scalars['Int']['output']
  id: Scalars['ID']['output']
  /** The name of the tag. */
  name: Scalars['String']['output']
  /** Identifies the date and time when the object was updated. */
  updatedAt: Scalars['DateTime']['output']
}

/** The connection type for Tag. */
export type TagConnection = {
  __typename?: 'TagConnection'
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TagEdge>>>
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Tag>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** Total count of nodes. */
  totalCount: Scalars['Int']['output']
}

/** An edge in a connection. */
export type TagEdge = {
  __typename?: 'TagEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of the edge. */
  node?: Maybe<Tag>
}

export type Website = {
  __typename?: 'Website'
  /** The value obtained by hashing the url with SHA-256. */
  checksum: Scalars['String']['output']
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output']
  /** The description of the website. */
  description: Scalars['String']['output']
  /** The domain of the website. */
  domain: Scalars['String']['output']
  /** The Node ID of the website object. */
  id: Scalars['ID']['output']
  /** The og:description of the website. */
  ogDescription: Scalars['String']['output']
  /** The og image of the website. */
  ogImage?: Maybe<WebsiteOgImage>
  /** The og:image of the website. */
  ogImageUrl: Scalars['String']['output']
  /** The og:locale of the website. */
  ogLocale: Scalars['String']['output']
  /** The og:site_name of the website. */
  ogSiteName: Scalars['String']['output']
  /** The og:title of the website. */
  ogTitle: Scalars['String']['output']
  /** The og:type of the website. */
  ogType: Scalars['String']['output']
  /** The og:url of the website. */
  ogUrl: Scalars['String']['output']
  /** The title of the website. */
  title: Scalars['String']['output']
  /** Identifies the date and time when the object was updated. */
  updatedAt: Scalars['DateTime']['output']
  /** The HTTP URL listing the website. */
  url: Scalars['String']['output']
}

/** The connection type for Website. */
export type WebsiteConnection = {
  __typename?: 'WebsiteConnection'
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<WebsiteEdge>>>
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Website>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
  /** Total count of nodes. */
  totalCount: Scalars['Int']['output']
}

/** An edge in a connection. */
export type WebsiteEdge = {
  __typename?: 'WebsiteEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of the edge. */
  node?: Maybe<Website>
}

export type WebsiteOgImage = {
  __typename?: 'WebsiteOgImage'
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime']['output']
  /** The file size of the og image. */
  fileSize: Scalars['Int']['output']
  /** The HTTP URL listing the og image file. */
  fileUrl?: Maybe<Scalars['String']['output']>
  /** The height of the og image file. */
  height: Scalars['Int']['output']
  /** The Node ID of the website og image object. */
  id: Scalars['ID']['output']
  /** Identifies the date and time when the object was updated. */
  updatedAt: Scalars['DateTime']['output']
  /** The width of the og image file. */
  width: Scalars['Int']['output']
}

export type DocumentQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>
}>

export type DocumentQuery = {
  __typename?: 'Query'
  document?: {
    __typename?: 'Document'
    id: string
    slug: string
    emoji: string
    title: string
    draft: boolean
    content: string
    path?: string | null
    publishedAt: any
    modifiedAt: any
    tags?: {
      __typename?: 'TagConnection'
      edges?: Array<{
        __typename?: 'TagEdge'
        node?: { __typename?: 'Tag'; id: string; name: string } | null
      } | null> | null
    } | null
    preview?: {
      __typename?: 'Asset'
      id: string
      width: number
      height: number
      path?: string | null
      fileUrl: string
    } | null
    assets?: {
      __typename?: 'AssetConnection'
      edges?: Array<{
        __typename?: 'AssetEdge'
        node?: {
          __typename?: 'Asset'
          id: string
          path?: string | null
          name: string
          fileUrl: string
          height: number
          width: number
        } | null
      } | null> | null
    } | null
    outboundLinkDocuments?: {
      __typename?: 'DocumentConnection'
      edges?: Array<{
        __typename?: 'DocumentEdge'
        node?: {
          __typename?: 'Document'
          id: string
          slug: string
          emoji: string
          title: string
          draft: boolean
          path?: string | null
          publishedAt: any
          modifiedAt: any
          tags?: {
            __typename?: 'TagConnection'
            edges?: Array<{
              __typename?: 'TagEdge'
              node?: { __typename?: 'Tag'; id: string; name: string } | null
            } | null> | null
          } | null
        } | null
      } | null> | null
    } | null
    inboundLinkDocuments?: {
      __typename?: 'DocumentConnection'
      edges?: Array<{
        __typename?: 'DocumentEdge'
        node?: {
          __typename?: 'Document'
          id: string
          slug: string
          emoji: string
          title: string
          draft: boolean
          path?: string | null
          publishedAt: any
          modifiedAt: any
          tags?: {
            __typename?: 'TagConnection'
            edges?: Array<{
              __typename?: 'TagEdge'
              node?: { __typename?: 'Tag'; id: string; name: string } | null
            } | null> | null
          } | null
        } | null
      } | null> | null
    } | null
    websites?: {
      __typename?: 'WebsiteConnection'
      edges?: Array<{
        __typename?: 'WebsiteEdge'
        node?: {
          __typename?: 'Website'
          id: string
          url: string
          domain: string
          title: string
          description: string
          ogSiteName: string
          ogTitle: string
          ogType: string
          ogUrl: string
          ogDescription: string
          ogLocale: string
          ogImage?: {
            __typename?: 'WebsiteOgImage'
            id: string
            fileUrl?: string | null
            width: number
            height: number
          } | null
        } | null
      } | null> | null
    } | null
  } | null
}

export type DocumentsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  filter?: InputMaybe<DocumentConnectionFilter>
  sort?: InputMaybe<ConnectionSort>
}>

export type DocumentsQuery = {
  __typename?: 'Query'
  documents?: {
    __typename?: 'DocumentConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'DocumentEdge'
      node?: {
        __typename?: 'Document'
        id: string
        slug: string
        emoji: string
        title: string
        draft: boolean
        path?: string | null
        publishedAt: any
        modifiedAt: any
        tags?: {
          __typename?: 'TagConnection'
          edges?: Array<{
            __typename?: 'TagEdge'
            node?: { __typename?: 'Tag'; id: string; name: string } | null
          } | null> | null
        } | null
        preview?: {
          __typename?: 'Asset'
          id: string
          width: number
          height: number
          path?: string | null
          fileUrl: string
        } | null
      } | null
    } | null> | null
  } | null
}

export type TagQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>
}>

export type TagQuery = {
  __typename?: 'Query'
  tag?: {
    __typename?: 'Tag'
    id: string
    name: string
    documentCount: number
    documentCountInPublished: number
  } | null
}

export type TagsQueryVariables = Exact<{
  sort?: InputMaybe<ConnectionSort>
}>

export type TagsQuery = {
  __typename?: 'Query'
  tags?: {
    __typename?: 'TagConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'TagEdge'
      node?: {
        __typename?: 'Tag'
        id: string
        name: string
        documentCount: number
        documentCountInPublished: number
      } | null
    } | null> | null
  } | null
}

export type WebsitesQueryVariables = Exact<{ [key: string]: never }>

export type WebsitesQuery = {
  __typename?: 'Query'
  websites?: {
    __typename?: 'WebsiteConnection'
    totalCount: number
    edges?: Array<{
      __typename?: 'WebsiteEdge'
      node?: {
        __typename?: 'Website'
        id: string
        url: string
        domain: string
        title: string
        description: string
        ogSiteName: string
        ogTitle: string
        ogType: string
        ogUrl: string
        ogDescription: string
        ogLocale: string
        ogImage?: {
          __typename?: 'WebsiteOgImage'
          id: string
          fileUrl?: string | null
          width: number
          height: number
        } | null
      } | null
    } | null> | null
  } | null
}

export const DocumentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'document' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'document' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'draft' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preview' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fileUrl' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'publishedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'assets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'fileUrl' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'outboundLinkDocuments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'draft' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tags' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'edges' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'id' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'name' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publishedAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'inboundLinkDocuments' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'draft' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tags' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'edges' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'node' },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'id' },
                                                    },
                                                    {
                                                      kind: 'Field',
                                                      name: { kind: 'Name', value: 'name' },
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publishedAt' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'websites' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'ogSiteName' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'ogTitle' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'ogType' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'ogUrl' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'ogDescription' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'ogLocale' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ogImage' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'fileUrl' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DocumentQuery, DocumentQueryVariables>
export const DocumentsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'documents' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'DocumentConnectionFilter' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ConnectionSort' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'documents' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'after' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'first' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'filter' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'draft' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'tags' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'id' },
                                              },
                                              {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'name' },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'preview' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'fileUrl' } },
                                ],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'publishedAt' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'modifiedAt' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DocumentsQuery, DocumentsQueryVariables>
export const TagDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'tag' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tag' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'documentCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'documentCountInPublished' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TagQuery, TagQueryVariables>
export const TagsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'tags' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ConnectionSort' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tags' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'documentCount' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'documentCountInPublished' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TagsQuery, TagsQueryVariables>
export const WebsitesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'websites' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'websites' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'totalCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'domain' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'ogSiteName' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'ogTitle' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'ogType' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'ogUrl' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'ogDescription' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'ogLocale' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ogImage' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'fileUrl' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'width' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'height' } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WebsitesQuery, WebsitesQueryVariables>
