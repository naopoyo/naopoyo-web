import Script from 'next/script'

import { GOOGLE_ADS_CLIENT, isProduction } from '@/env'

import type { ReactElement } from 'react'

/**
 * Google AdSenseスクリプトローダーコンポーネント
 *
 * Google AdSenseのスクリプトを読み込み、ページで広告を表示可能にします。
 * 本番環境でのみスクリプトを読み込みます。
 *
 * @component
 * @example
 * ```tsx
 * <GoogleAdsScript />
 * ```
 *
 * @remarks
 * - 本番環境（isProduction）でのみスクリプトを読み込み
 * - GOOGLE_ADS_CLIENTが設定されている必要があります
 * - 他のインタラクティブなスクリプトの後に読み込まれます（strategy="afterInteractive"）
 * - GoogleAdコンポーネントと組み合わせて使用します
 *
 * @see https://support.google.com/adsense/answer/7670025
 */
export default function GoogleAdsScript(): ReactElement | null {
  if (!isProduction || !GOOGLE_ADS_CLIENT) {
    return null
  }

  const GOOGLE_ADS_BASE_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  const params = new URLSearchParams({ client: `ca-pub-${GOOGLE_ADS_CLIENT}` })
  const scriptSrc = `${GOOGLE_ADS_BASE_URL}?${params.toString()}`

  return <Script async src={scriptSrc} crossOrigin="anonymous" strategy="afterInteractive" />
}
