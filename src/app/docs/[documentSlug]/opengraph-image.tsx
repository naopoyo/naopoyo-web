import { notFound } from 'next/navigation'

import { DocumentOpengraphImage } from '@/components/opengraph-image'
import { client } from '@/lib/hackersheet/client'

export const runtime = 'edge'
export const alt = 'naopoyo'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface OpengraphImageProps {
  params: Promise<{ documentSlug: string }>
}

export default async function OpengraphImage({ params }: OpengraphImageProps) {
  const { documentSlug } = await params
  const { document } = await client.getDocument({ slug: documentSlug })

  if (!document || document.draft) notFound()

  return DocumentOpengraphImage(size, document.emoji, document.title)
}
