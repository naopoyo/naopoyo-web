import { getClient } from './client'
import { graphql } from './gql'
import { TagDocument } from './gql/graphql'

graphql(`
  query tag($name: String) {
    tag(name: $name) {
      id
      name
      documentCount
      documentCountInPublished
    }
  }
`)

export interface GetTagArgs {
  name: string
}

export default async function getTag({ name }: GetTagArgs) {
  const { data, error } = await getClient().query(TagDocument, { name: name })

  const tag = data?.tag ?? null

  return { tag, error }
}
