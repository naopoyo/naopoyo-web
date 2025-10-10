import { client } from '@/lib/hackersheet'

export default async function getPicupSlugs() {
  const { tree } = await client.getTree({ slug: 'pickup' })
  return (
    tree?.flatNodes.map((node) => node.document?.slug).filter((slug) => slug !== undefined) ?? []
  )
}
