import { DocumentOpengraphImage } from '@/components/opengraph-image'

export const runtime = 'edge'
export const alt = 'naopoyo'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return DocumentOpengraphImage(size, '🎲', 'ランダム絵文字コピー')
}
