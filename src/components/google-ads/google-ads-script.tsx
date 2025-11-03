import Script from 'next/script'

import { GOOGLE_ADS_CLIENT, isProduction } from '@/constants'

export default function GoogleAdsScript() {
  if (!isProduction || GOOGLE_ADS_CLIENT === '') {
    return null
  }

  const baseUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  const params = new URLSearchParams({ client: `ca-pub-${GOOGLE_ADS_CLIENT}` })
  const src = `${baseUrl}?${params.toString()}`

  return <Script async src={src} crossOrigin="anonymous" strategy="afterInteractive" />
}
