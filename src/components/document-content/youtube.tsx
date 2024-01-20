import { YouTubeEmbed } from '@next/third-parties/google'

export interface YoutubeProps {
  videoId: string
  params?: { [key: string]: string | number | undefined }
}

export default async function Youtube({ videoId, params }: YoutubeProps) {
  const paramsString = params
    ? Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`
        )
        .join('&')
    : undefined

  return (
    <div className="my-6">
      <YouTubeEmbed videoid={videoId} params={paramsString} style="margin: 0 auto;" />
    </div>
  )
}
