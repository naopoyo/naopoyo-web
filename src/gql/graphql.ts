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
  createdAt: Scalars['DateTime']['output']
  fileSize: Scalars['Int']['output']
  fileUrl: Scalars['String']['output']
  height: Scalars['Int']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  path?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
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

export type ConnectionSort = {
  by?: InputMaybe<Scalars['String']['input']>
  order?: InputMaybe<Scalars['String']['input']>
}

export type Document = {
  __typename?: 'Document'
  assets?: Maybe<AssetConnection>
  content: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  draft: Scalars['Boolean']['output']
  emoji: Scalars['String']['output']
  id: Scalars['ID']['output']
  inboundLinkDocuments?: Maybe<DocumentConnection>
  modifiedAt: Scalars['DateTime']['output']
  outboundLinkDocuments?: Maybe<DocumentConnection>
  path?: Maybe<Scalars['String']['output']>
  preview?: Maybe<Asset>
  publishedAt: Scalars['DateTime']['output']
  rawContent: Scalars['String']['output']
  slug: Scalars['String']['output']
  tags?: Maybe<TagConnection>
  title: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
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

export type DocumentConnectionFilter = {
  createdAtEnd?: InputMaybe<Scalars['DateTime']['input']>
  createdAtStart?: InputMaybe<Scalars['DateTime']['input']>
  draft?: InputMaybe<Scalars['Boolean']['input']>
  excludeTags?: InputMaybe<Array<Scalars['String']['input']>>
  modifiedAtEnd?: InputMaybe<Scalars['DateTime']['input']>
  modifiedAtStart?: InputMaybe<Scalars['DateTime']['input']>
  publishedAtEnd?: InputMaybe<Scalars['DateTime']['input']>
  publishedAtStart?: InputMaybe<Scalars['DateTime']['input']>
  tags?: InputMaybe<Array<Scalars['String']['input']>>
  tagsNone?: InputMaybe<Scalars['Boolean']['input']>
  updatedAtEnd?: InputMaybe<Scalars['DateTime']['input']>
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
  /** アセット. */
  asset?: Maybe<Asset>
  /** ストレージアイテム一覧. */
  assets?: Maybe<AssetConnection>
  /** ドキュメント. */
  document?: Maybe<Document>
  /** ドキュメント一覧. */
  documents?: Maybe<DocumentConnection>
  /** タグ. */
  tag?: Maybe<Tag>
  /** タグ一覧. */
  tags?: Maybe<TagConnection>
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

export type Tag = {
  __typename?: 'Tag'
  createdAt: Scalars['DateTime']['output']
  documentCount: Scalars['Int']['output']
  documentCountInPublished: Scalars['Int']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
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
