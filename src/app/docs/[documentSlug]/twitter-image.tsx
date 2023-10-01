import { notFound } from 'next/navigation'

import getDocument from '@/features/document/functions/get-document'

import { createOgImage } from './_og-image/create-og-image'

export const runtime = 'edge'
export const alt = 'naopoyo'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

interface TwitterImageProps {
  params: { documentSlug: string }
}

export default async function TwitterImage({ params: { documentSlug } }: TwitterImageProps) {
  const { document } = await getDocument({ slug: documentSlug })

  if (!document || document.draft) notFound()

  return createOgImage(size, document.emoji, document.title)
}
