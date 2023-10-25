import { Document as GqlDocument, Tag as GqlTag, Asset as GqlAsset } from '@/lib/gql/graphql'

export type DocumentPreview = Pick<GqlAsset, 'id' | 'width' | 'height' | 'path' | 'fileUrl'>

export type DocumentListItemTag = Pick<GqlTag, 'id' | 'name'>

export type DocumentListItemTagList = DocumentListItemTag[]

export type DocumentListItem = Pick<
  GqlDocument,
  'id' | 'slug' | 'emoji' | 'title' | 'draft' | 'path' | 'publishedAt' | 'modifiedAt'
> & {
  tags: DocumentListItemTagList
  preview?: DocumentPreview | null
}

export type DocumentList = DocumentListItem[]

export type Document = Pick<
  GqlDocument,
  'id' | 'slug' | 'emoji' | 'title' | 'draft' | 'path' | 'content' | 'publishedAt' | 'modifiedAt'
> & {
  tags: DocumentListItemTagList
  outboundLinkDocuments: DocumentListItem[]
  preview?: DocumentPreview | null
}

export type TagListItem = Pick<GqlTag, 'id' | 'name' | 'documentCountInPublished'>

export type TagList = TagListItem[]
