/**
 * @fileoverview Hackersheet API クライアント初期化のユニットテスト
 */

import { createClient } from '@hackersheet/core'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@hackersheet/core', () => ({
  createClient: vi.fn(() => ({})),
}))

vi.mock('@/constants', () => ({
  HACKERSHEET_API_ACCESS_KEY: 'test-access-key',
  HACKERSHEET_API_ENDPOINT: 'https://test.example.com',
}))

describe('client', () => {
  it('createClient に正しい url と accessKey が渡される', async () => {
    // モジュール読み込み時に createClient が呼ばれるため、動的 import で検証
    await import('../client')

    expect(createClient).toHaveBeenCalledWith({
      url: 'https://test.example.com',
      accessKey: 'test-access-key',
    })
  })
})
