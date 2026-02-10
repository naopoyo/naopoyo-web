import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockEnv = vi.hoisted(() => ({
  isProduction: true,
  GOOGLE_ADS_CLIENT: 'test-client-id',
}))

vi.mock('@/env', () => mockEnv)

vi.mock('next/script', () => ({
  default: vi.fn((props: Record<string, unknown>) => ({
    type: 'Script',
    props,
  })),
}))

import GoogleAdsScript from '../google-ads-script'

describe('GoogleAdsScript', () => {
  beforeEach(() => {
    mockEnv.isProduction = true
    mockEnv.GOOGLE_ADS_CLIENT = 'test-client-id'
  })

  it('本番環境でクライアントIDがある場合、Script を返す', () => {
    const result = GoogleAdsScript()

    expect(result).not.toBeNull()
  })

  it('スクリプト src に正しい URL とクライアントIDを含む', () => {
    const result = GoogleAdsScript() as unknown as { props: Record<string, unknown> }

    expect(result.props.src).toContain('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
    expect(result.props.src).toContain('client=ca-pub-test-client-id')
  })

  it('非本番環境では null を返す', () => {
    mockEnv.isProduction = false

    const result = GoogleAdsScript()

    expect(result).toBeNull()
  })

  it('GOOGLE_ADS_CLIENT が空の場合は null を返す', () => {
    mockEnv.GOOGLE_ADS_CLIENT = ''

    const result = GoogleAdsScript()

    expect(result).toBeNull()
  })
})
