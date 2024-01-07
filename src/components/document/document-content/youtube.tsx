import { YouTubeEmbed } from '@next/third-parties/google'

export interface YoutubeProps {
  id: string
}

export default async function Youtube({ id }: YoutubeProps) {
  return (
    <div className="my-6">
      <YouTubeEmbed videoid={id} />
    </div>
  )
}
