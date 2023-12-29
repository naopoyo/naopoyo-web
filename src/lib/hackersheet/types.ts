export type DocumentPreview = {
  id: string
  width: number
  height: number
  path?: string | null
  fileUrl: string
}

export type DocumentListItemTag = {
  id: string
  name: string
}

export type DocumentListItemTagList = DocumentListItemTag[]

export type DocumentListItem = {
  id: string
  slug: string
  emoji: string
  title: string
  draft: boolean
  path?: string | null
  publishedAt: string
  modifiedAt: string
  tags: DocumentListItemTagList
  preview?: DocumentPreview | null
}

export type DocumentList = DocumentListItem[]

export type Document = {
  id: string
  slug: string
  emoji: string
  title: string
  draft: boolean
  content: string
  path?: string | null
  publishedAt: string
  modifiedAt: string
  tags: DocumentListItemTagList
  outboundLinkDocuments: DocumentListItem[]
  inboundLinkDocuments: DocumentListItem[]
  preview?: DocumentPreview | null
}

export type TagListItem = {
  id: string
  name: string
  documentCountInPublished: number
}

export type TagList = TagListItem[]
