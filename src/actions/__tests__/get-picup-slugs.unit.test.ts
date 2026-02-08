import { describe, it, expect, vi, beforeEach } from 'vitest'

import getPicupSlugs from '../get-picup-slugs'

const mockGetTree = vi.fn()

vi.mock('@/lib/hackersheet', () => ({
  client: {
    getTree: (...args: unknown[]) => mockGetTree(...args),
  },
}))

describe('getPicupSlugs', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('flatNodes から slug の配列を返す', async () => {
    mockGetTree.mockResolvedValue({
      tree: {
        flatNodes: [
          { document: { slug: 'post-1' } },
          { document: { slug: 'post-2' } },
          { document: { slug: 'post-3' } },
        ],
      },
    })

    const result = await getPicupSlugs()

    expect(result).toEqual(['post-1', 'post-2', 'post-3'])
  })

  it('document が null のノードを除外する', async () => {
    mockGetTree.mockResolvedValue({
      tree: {
        flatNodes: [
          { document: { slug: 'post-1' } },
          { document: null },
          { document: { slug: 'post-3' } },
        ],
      },
    })

    const result = await getPicupSlugs()

    expect(result).toEqual(['post-1', 'post-3'])
  })

  it('tree が undefined の場合は空配列を返す', async () => {
    mockGetTree.mockResolvedValue({ tree: undefined })

    const result = await getPicupSlugs()

    expect(result).toEqual([])
  })

  it('slug "pickup" で getTree を呼び出す', async () => {
    mockGetTree.mockResolvedValue({ tree: { flatNodes: [] } })

    await getPicupSlugs()

    expect(mockGetTree).toHaveBeenCalledWith({ slug: 'pickup' })
  })
})
