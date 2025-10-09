import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import { vi, describe, it, expect, beforeEach, afterEach, type Mock } from 'vitest'

// Mock the hackersheet client used by the page module
vi.mock('@/lib/hackersheet', () => {
  return {
    client: {
      getTree: vi.fn(),
      getDocuments: vi.fn(),
    },
  }
})

import HomePage from '@/app/page'
import { RECENT_DOCS_COUNT, SITE_DESC } from '@/constants'
import { client } from '@/lib/hackersheet'

describe('HomePage', () => {
  beforeEach(() => {
    // テスト間でモックをリセットする
    vi.clearAllMocks()
  })

  afterEach(() => {
    // DOM をクリーンアップし、非同期作業が残らないようにする
    cleanup()
    vi.clearAllMocks()
  })

  it('プロフィールセクションと主要リンクをレンダリングし、getTreeが呼ばれること', async () => {
    // getTree を空のツリーで解決させる
    ;(client.getTree as unknown as Mock).mockResolvedValue({ tree: { flatNodes: [] } })
    const element = await HomePage()
    const { container } = render(element as React.ReactElement)

    // プロフィール名
    expect(screen.getByText('naopoyo')).toBeTruthy()

    // 定数からのサイト説明
    expect(screen.getByText(SITE_DESC)).toBeTruthy()

    // リンクが存在すること
    expect(screen.getByText('すべての記事を見る')).toBeTruthy()
    expect(screen.getByText('記事をタグで探す')).toBeTruthy()

    // client.getTree が pickup スラッグ取得のために少なくとも一度呼ばれていること
    expect((client.getTree as unknown as Mock).mock.calls.length).toBeGreaterThanOrEqual(1)

    // Suspense のフォールバックとしてスケルトンがレンダリングされる（最近 + ピックアップ）
    const skeletons = container.querySelectorAll('.animate-pulse')
    // 最近のフォールバックは少なくとも RECENT_DOCS_COUNT 個のアイテムがある
    expect(skeletons.length).toBeGreaterThanOrEqual(RECENT_DOCS_COUNT)
  })

  it('スケルトンの数が recent + pickup の合計になること', async () => {
    const pickupLength = 3

    ;(client.getTree as unknown as Mock).mockResolvedValue({
      tree: {
        flatNodes: Array.from({ length: pickupLength }).map((_, i) => ({
          document: { slug: `p-${i}` },
        })),
      },
    })

    const element = await HomePage()
    const { container } = render(element as React.ReactElement)

    const skeletons = container.querySelectorAll('.animate-pulse')
    // Suspense のフォールバックは2つ（最近 RECENT_DOCS_COUNT + ピックアップ pickupLength）
    expect(skeletons.length).toBe(RECENT_DOCS_COUNT + pickupLength)
  })
})
