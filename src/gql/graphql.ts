/* eslint-disable */
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

export type Document = {
  __typename?: 'Document'
  assets?: Maybe<AssetConnection>
  content: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  inboundLinkDocuments?: Maybe<DocumentConnection>
  outboundLinkDocuments?: Maybe<DocumentConnection>
  path?: Maybe<Scalars['String']['output']>
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
}

export type QueryDocumentArgs = {
  id?: InputMaybe<Scalars['String']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type QueryDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
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
}

export type Tag = {
  __typename?: 'Tag'
  createdAt: Scalars['DateTime']['output']
  documentCount: Scalars['Int']['output']
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
