import { notFound } from 'next/navigation'

import { DocumentOpengraphImage } from '@/components/opengraph-image'
import { getDocument } from '@/lib/hackersheet'

export const runtime = 'edge'
export const alt = 'naopoyo'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface OpengraphImageProps {
  params: { documentSlug: string }
}

export default async function OpengraphImage({ params: { documentSlug } }: OpengraphImageProps) {
  const { document } = await getDocument({ slug: documentSlug })

  if (!document || document.draft) notFound()

  return DocumentOpengraphImage(size, document.emoji, document.title)
}
