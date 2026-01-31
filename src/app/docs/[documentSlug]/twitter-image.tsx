import { notFound } from 'next/navigation'

import { client } from '@/lib/hackersheet/client'

import { DocumentOpengraphImage } from '@/components/opengraph-image'

export const runtime = 'edge'
export const alt = 'naopoyo'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface TwitterImageProps {
  params: Promise<{ documentSlug: string }>
}

export default async function TwitterImage({ params }: TwitterImageProps) {
  const { documentSlug } = await params
  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document || document.draft) notFound()

  return DocumentOpengraphImage(size, document.emoji, document.title)
}
