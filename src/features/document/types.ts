import { Document as GqlDocument, Tag as GqlTag } from '@/gql/graphql'

export type DocumentListItemTag = Pick<GqlTag, 'id' | 'name'>

export type DocumentListItemTagList = DocumentListItemTag[]

export type DocumentListItem = Pick<
  GqlDocument,
  | 'id'
  | 'slug'
  | 'emoji'
  | 'title'
  | 'draft'
  | 'rawContent'
  | 'content'
  | 'path'
  | 'publishedAt'
  | 'modifiedAt'
  | 'createdAt'
  | 'updatedAt'
> & {
  tags?: DocumentListItemTagList
}

export type DocumentList = DocumentListItem[]
