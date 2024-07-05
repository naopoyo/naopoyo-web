import { YouTubeEmbed } from '@next/third-parties/google'

export type YoutubeProps = {
  videoId: string
  params?: { [key: string]: string | number | undefined }
  height?: number
  width?: number
  playLabel?: string
  style?: string
}

export default async function Youtube({ videoId, params, playLabel, ...props }: YoutubeProps) {
  const paramsString = params
    ? Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`
        )
        .join('&')
    : undefined

  return <YouTubeEmbed {...props} videoid={videoId} params={paramsString} playlabel={playLabel} />
}
