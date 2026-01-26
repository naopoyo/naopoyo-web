import { describe, it, expect, vi } from 'vitest'

import { client } from '../client'

vi.mock('@hackersheet/core', () => ({
  createClient: vi.fn(() => ({
    url: 'https://api.example.com',
    accessKey: 'test-key',
  })),
}))

vi.mock('@/constants', () => ({
  HACKERSHEET_API_ACCESS_KEY: 'test-access-key',
  HACKERSHEET_API_ENDPOINT: 'https://test.example.com',
}))

describe('client', () => {
  describe('基本動作', () => {
    it('クライアントが定義されている', () => {
      expect(client).toBeDefined()
    })

    it('クライアントはオブジェクトである', () => {
      expect(typeof client).toBe('object')
    })

    it('クライアントは URL を持つ', () => {
      expect(client).toHaveProperty('url')
    })

    it('クライアントは accessKey を持つ', () => {
      expect(client).toHaveProperty('accessKey')
    })
  })

  describe('クライアント設定', () => {
    it('API エンドポイントが正しく設定されている', () => {
      expect(client.url).toBe('https://api.example.com')
    })

    it('API アクセスキーが正しく設定されている', () => {
      expect(client.accessKey).toBe('test-key')
    })
  })
})
