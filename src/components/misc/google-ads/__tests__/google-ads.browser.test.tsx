import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'

vi.mock('@/env', () => ({
  isProduction: true,
  GOOGLE_ADS_CLIENT: 'test-client-id',
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/test-page',
}))

import GoogleAds from '../google-ads'

describe('GoogleAds', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delete (window as Record<string, unknown>).adsbygoogle
  })

  afterEach(() => {
    cleanup()
  })

  it('本番環境でマウント後に ins.adsbygoogle 要素を表示する', () => {
    const { container } = render(<GoogleAds slot="1234567890" />)

    expect(container.querySelector('ins.adsbygoogle')).toBeTruthy()
  })

  it('data-ad-slot と data-ad-client が正しく設定される', () => {
    const { container } = render(<GoogleAds slot="9876543210" />)
    const ins = container.querySelector('ins.adsbygoogle')

    expect(ins?.getAttribute('data-ad-slot')).toBe('9876543210')
    expect(ins?.getAttribute('data-ad-client')).toBe('ca-pub-test-client-id')
  })

  it('format と responsive のデフォルト値が設定される', () => {
    const { container } = render(<GoogleAds slot="1234567890" />)
    const ins = container.querySelector('ins.adsbygoogle')

    expect(ins?.getAttribute('data-ad-format')).toBe('auto')
    expect(ins?.getAttribute('data-full-width-responsive')).toBe('true')
  })

  it('format と responsive のカスタム値が反映される', () => {
    const { container } = render(
      <GoogleAds slot="1234567890" format="rectangle" responsive="false" />
    )
    const ins = container.querySelector('ins.adsbygoogle')

    expect(ins?.getAttribute('data-ad-format')).toBe('rectangle')
    expect(ins?.getAttribute('data-full-width-responsive')).toBe('false')
  })
})
