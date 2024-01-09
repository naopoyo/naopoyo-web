import { Element } from 'hast'
import { ReactNode } from 'react'
import { ExtraProps } from 'react-markdown'

import Youtube from './youtube'

export default function YoutubeDirective({ children, node }: { children: ReactNode } & ExtraProps) {
  const childrenElm = <p>{children}</p>

  if (!node) return childrenElm

  const href = (node['children'][0] as Element).properties?.href

  if (!href || typeof href !== 'string') return childrenElm

  const id = getIdFromYoutubeUrl(href)

  if (!id) return childrenElm

  const start = getStartFromYoutubeUrl(href)

  return <Youtube id={id} start={start} />
}

function getIdFromYoutubeUrl(value: string) {
  const matched =
    /^https?:\/\/(www\.)?youtube\.com\/watch\?(.*&)?v=(?<videoId>[^&]+)/.exec(value) ??
    /^https?:\/\/youtu\.be\/(?<videoId>[^?]+)/.exec(value) ??
    /^https?:\/\/(www\.)?youtube\.com\/embed\/(?<videoId>[^?]+)/.exec(value)

  if (matched?.groups?.videoId) {
    return matched.groups.videoId
  }
}

function getStartFromYoutubeUrl(value: string) {
  try {
    const url = new URL(value)
    const t = url.searchParams.get('t')

    if (!t) return

    return Number(t.endsWith('s') ? t.slice(0, -1) : t)
  } catch {
    return
  }
}
