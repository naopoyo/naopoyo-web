import { Document as GqlDocument, Tag as GqlTag } from '@/gql/graphql'

export type DocumentListItemTag = Pick<GqlTag, 'id' | 'name'>

export type DocumentListItemTagList = DocumentListItemTag[]

export type DocumentListItem = Pick<
  GqlDocument,
  'id' | 'slug' | 'emoji' | 'title' | 'draft' | 'path' | 'publishedAt' | 'modifiedAt'
> & {
  tags: DocumentListItemTagList
}

export type DocumentList = DocumentListItem[]

export type Document = Pick<
  GqlDocument,
  'id' | 'slug' | 'emoji' | 'title' | 'draft' | 'path' | 'content' | 'publishedAt' | 'modifiedAt'
> & {
  tags: DocumentListItemTagList
  outboundLinkDocuments: DocumentListItem[]
}
