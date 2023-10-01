'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: any
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID
  const isProduction = process.env.NODE_ENV === 'production'

  const pageView = (url: string) => {
    window.gtag('event', 'page_view', {
      page_path: url,
    })
  }

  useEffect(() => {
    if (!isProduction || !googleTagId) {
      return
    }
    const url = pathname + searchParams.toString()
    pageView(url)
  }, [pathname, searchParams, googleTagId, isProduction])

  if (!isProduction || !googleTagId) {
    return null
  }

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${googleTagId}');
`,
        }}
      />
    </>
  )
}
