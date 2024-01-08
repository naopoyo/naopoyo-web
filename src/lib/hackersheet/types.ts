type OgImage = {
  id: string
  file: string
  height: number
  width: number
}

type Website = {
  id: string
  url: string
  domain: string
  title: string
  description: string
  ogSiteName: string
  ogTitle: string
  ogType: string
  ogUrl: string
  ogImage: OgImage | null
  ogDescription: string
  ogLocale: string
}

type Asset = {
  id: string
  path: string
  name: string
  fileUrl: string
  height: number
  width: number
}

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
  assets: Asset[]
  outboundLinkDocuments: DocumentListItem[]
  inboundLinkDocuments: DocumentListItem[]
  websites: Website[]
  preview?: DocumentPreview | null
}

export type TagListItem = {
  id: string
  name: string
  documentCountInPublished: number
}

export type TagList = TagListItem[]
