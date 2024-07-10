export type TagListItem = {
  id: string
  name: string
  documentCount: number
  documentCountInPublished: number
  relatedTags: RelatedTagList
}

export type TagList = TagListItem[]

export type RelatedTagListItem = {
  id: string
  name: string
  documentCount: number
  documentCountInPublished: number
}

export type RelatedTagList = RelatedTagListItem[]
