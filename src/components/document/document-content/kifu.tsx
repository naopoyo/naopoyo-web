'use client'

import { KifuLite } from 'kifu-for-js'

export interface KifuProps {
  kifu: string
}

export default function Kifu({ kifu }: KifuProps) {
  return (
    <div className="my-6">
      <KifuLite kifu={kifu} />
    </div>
  )
}
