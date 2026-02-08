'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { GOOGLE_ADS_CLIENT, isProduction } from '@/env'
import { useClientOnly } from '@/hooks'

declare global {
  interface Window {
    /**
     * Google AdSense API for managing advertisements.
     * @see https://support.google.com/adsense/answer/10173099
     */
    adsbygoogle: { [key: string]: unknown }[]
  }
}

/**
 * Props for the GoogleAds component
 */
export type GoogleAdProps = {
  /**
   * Google AdSenseのスロットID
   * @example "1234567890"
   */
  slot: string

  /**
   * 広告フォーマット
   * @default "auto"
   * @example "auto" | "rectangle" | "vertical" | "horizontal"
   */
  format?: string

  /**
   * レスポンシブ広告の有効化
   * @default "true"
   */
  responsive?: string
}

/**
 * Google AdSenseの広告を表示するコンポーネント
 *
 * 本番環境でのみ広告を表示し、クライアント側でのみレンダリングされます。
 * GoogleAdsScriptコンポーネントと併用することで、Google AdSenseスクリプトが読み込まれます。
 *
 * @component
 * @example
 * ```tsx
 * <GoogleAds slot="1234567890" format="auto" responsive="true" />
 * ```
 *
 * @param {GoogleAdProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element | null} 広告要素、またはスキップ条件下ではnull
 *
 * @remarks
 * - 本番環境（isProduction）でのみ広告を表示
 * - GoogleAds_CLIENTが設定されている必要があります
 * - クライアント側でのみマウント後に動作
 * - パスの変更を検出して広告を再読み込み
 */
export default function GoogleAds({ slot, format = 'auto', responsive = 'true' }: GoogleAdProps) {
  const pathname = usePathname() ?? ''
  const { mounted } = useClientOnly()

  const shouldSkip = !isProduction || !GOOGLE_ADS_CLIENT || !mounted

  useEffect(() => {
    if (shouldSkip) {
      return
    }

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense API呼び出しに失敗した場合は無視
    }
  }, [pathname, shouldSkip])

  if (shouldSkip) {
    return null
  }

  const adKey = `${pathname.replace(/\//g, '-')}-${slot}`
  const clientId = `ca-pub-${GOOGLE_ADS_CLIENT}`

  return (
    <div key={adKey}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}
