'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { GOOGLE_ADS_CLIENT, isProduction } from '@/constants'
import { useClientOnly } from '@/hooks'

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

export type GoogleAdProps = {
  slot: string
  format?: string
  responsive?: string
}

export default function GoogleAds({ slot, format = 'auto', responsive = 'true' }: GoogleAdProps) {
  const pathname = usePathname() || ''
  const { mounted } = useClientOnly()
  const isSkip = !isProduction || GOOGLE_ADS_CLIENT === '' || !mounted

  useEffect(() => {
    if (isSkip) {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [pathname, isSkip])

  if (isSkip) {
    return null
  }

  return (
    <div key={pathname.replace(/\//g, '-') + '-' + slot}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={`ca-pub-${GOOGLE_ADS_CLIENT}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
