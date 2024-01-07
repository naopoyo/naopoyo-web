import { YouTubeEmbed } from '@next/third-parties/google'

export interface YoutubeProps {
  id: string
  start?: number
}

export default async function Youtube({ id, start }: YoutubeProps) {
  const params: { [key: string]: string | number | undefined } = { start: start }
  const paramsString = Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`
    )
    .join('&')

  return (
    <div className="my-6">
      <YouTubeEmbed videoid={id} params={paramsString} />
    </div>
  )
}
