import { Tag as GqlTag } from '@/gql/graphql'

export type TagListItem = Pick<GqlTag, 'id' | 'name' | 'documentCountInPublished'>

export type TagList = TagListItem[]
