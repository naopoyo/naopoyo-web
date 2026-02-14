import { describe, expect, it } from 'vitest'

import { calculateEstimate, formatEstimateMarkdown, roundToOneDecimal } from '../utils'

describe('roundToOneDecimal', () => {
  it.each([
    [1.44, 1.4],
    [1.45, 1.5],
    [1.05, 1.1],
    [2.0, 2],
    [0, 0],
    [0.075, 0.1],
  ])('roundToOneDecimal(%d) → %d', (input, expected) => {
    expect(roundToOneDecimal(input)).toBe(expected)
  })
})

describe('calculateEstimate', () => {
  it('無効な入力でゼロの結果を返す', () => {
    const zero = {
      baseDays: 0,
      additionalDays: 0,
      subtotal: 0,
      uncertaintyMultiplier: 1,
      totalDays: 0,
      optimisticDays: 0,
      pessimisticDays: 0,
    }
    expect(calculateEstimate(0, [], [])).toEqual(zero)
    expect(calculateEstimate(-1, [], [])).toEqual(zero)
    expect(calculateEstimate(NaN, [], [])).toEqual(zero)
  })

  it('追加作業・不確実性なしでベース工数をそのまま返す', () => {
    const result = calculateEstimate(3, [], [])
    expect(result).toEqual({
      baseDays: 3,
      additionalDays: 0,
      subtotal: 3,
      uncertaintyMultiplier: 1,
      totalDays: 3,
      optimisticDays: 3,
      pessimisticDays: 3,
    })
  })

  it('追加作業を正しく加算する', () => {
    // testing(+30%) + review(+25%) = +55%
    const result = calculateEstimate(2, ['testing', 'review'], [])
    expect(result.additionalDays).toBe(1.1)
    expect(result.subtotal).toBe(3.1)
    expect(result.totalDays).toBe(3.1)
  })

  it('不確実性係数を対数モデルで計算する', () => {
    // new-tech(weight=0.5): 1 + 1.5 × ln(1.5) ≈ 1.61
    const result = calculateEstimate(2, [], ['new-tech'])
    expect(result.uncertaintyMultiplier).toBe(1.61)
    // Math.ceil(2 * 1.61 * 10) / 10 = 3.3
    expect(result.totalDays).toBe(3.3)
  })

  it('不確実性がある場合にレンジを計算する', () => {
    // new-tech(weight=0.5) → multiplier ≈ 1.608, sqrt ≈ 1.268
    // rawTotal = 2 × 1.608 = 3.216
    // optimistic = floor(3.216 / 1.268 * 10) / 10 = floor(25.36) / 10 = 2.5
    // pessimistic = ceil(3.216 × 1.268 * 10) / 10 = ceil(40.80) / 10 = 4.1
    const result = calculateEstimate(2, [], ['new-tech'])
    expect(result.optimisticDays).toBe(2.5)
    expect(result.pessimisticDays).toBe(4.1)
  })

  it('不確実性がない場合はレンジが同値になる', () => {
    const result = calculateEstimate(2, ['testing'], [])
    expect(result.optimisticDays).toBe(result.totalDays)
    expect(result.pessimisticDays).toBe(result.totalDays)
  })

  it('複数の不確実性係数を対数逓減モデルで合成する', () => {
    // new-tech(0.5) + unclear-requirements(0.5) → S=1.0
    // 1 + 1.5 × ln(2.0) ≈ 2.04
    const result = calculateEstimate(1, [], ['new-tech', 'unclear-requirements'])
    expect(result.uncertaintyMultiplier).toBe(2.04)
    // Math.ceil(1 * 2.04 * 10) / 10 = 2.1
    expect(result.totalDays).toBe(2.1)
  })

  it('追加作業と不確実性を組み合わせて計算する', () => {
    // testing(+30%) → subtotal 1.3, new-tech(weight=0.5) → 1 + 1.5 × ln(1.5) ≈ 1.61
    // 1.3 × 1.61 = 2.093 → ceil → 2.1
    const result = calculateEstimate(1, ['testing'], ['new-tech'])
    expect(result.additionalDays).toBe(0.3)
    expect(result.subtotal).toBe(1.3)
    expect(result.totalDays).toBe(2.1)
  })

  it('存在しない ID を無視する', () => {
    const result = calculateEstimate(1, ['nonexistent'], ['nonexistent'])
    expect(result.additionalDays).toBe(0)
    expect(result.uncertaintyMultiplier).toBe(1)
    expect(result.totalDays).toBe(1)
  })

  it('totalDays を 0.1日単位で切り上げる', () => {
    // deploy(+15%) → subtotal 1.15, external-dependency(weight=0.3) → 1 + 1.5 × ln(1.3) ≈ 1.394
    // 1.15 × 1.394 = 1.603 → Math.ceil(16.03) / 10 = 1.7
    const result = calculateEstimate(1, ['deploy'], ['external-dependency'])
    expect(result.totalDays).toBe(1.7)
  })
})

describe('formatEstimateMarkdown', () => {
  it('追加作業・不確実性なしの基本フォーマット', () => {
    const estimate = {
      baseDays: 3,
      additionalDays: 0,
      subtotal: 3,
      uncertaintyMultiplier: 1,
      totalDays: 3,
      optimisticDays: 3,
      pessimisticDays: 3,
    }
    const text = formatEstimateMarkdown(estimate, [], [])
    expect(text).toContain('# ■ 工数見積もり')
    expect(text).toContain('実装工数（直感）: 3日')
    expect(text).toContain('追加作業: +0日')
    expect(text).toContain('小計: 3日')
    expect(text).toContain('最終見積もり: 3日')
    expect(text).toContain('不確実性係数: ×1')
    expect(text).not.toContain('レンジ')
  })

  it('追加作業の内訳を含む', () => {
    const estimate = {
      baseDays: 2,
      additionalDays: 0.6,
      subtotal: 2.6,
      uncertaintyMultiplier: 1,
      totalDays: 2.6,
      optimisticDays: 2.6,
      pessimisticDays: 2.6,
    }
    const text = formatEstimateMarkdown(estimate, ['testing'], [])
    expect(text).toContain('追加作業: +0.6日')
    expect(text).toContain('- [x] テスト: +0.6日')
    expect(text).toContain('- [ ] レビュー対応')
  })

  it('不確実性の内訳を影響度ラベルで含む', () => {
    const estimate = {
      baseDays: 2,
      additionalDays: 0,
      subtotal: 2,
      uncertaintyMultiplier: 1.61,
      totalDays: 3.3,
      optimisticDays: 2.5,
      pessimisticDays: 4.1,
    }
    const text = formatEstimateMarkdown(estimate, [], ['new-tech'])
    expect(text).toContain('不確実性係数: ×1.61')
    expect(text).toContain('- [x] 未経験の技術 (高)')
    expect(text).toContain('- [ ] 仕様未確定 (高)')
    expect(text).toContain('レンジ: 2.5日 〜 4.1日')
  })

  it('不確実性がない場合はレンジを表示しない', () => {
    const estimate = {
      baseDays: 2,
      additionalDays: 0.6,
      subtotal: 2.6,
      uncertaintyMultiplier: 1,
      totalDays: 2.6,
      optimisticDays: 2.6,
      pessimisticDays: 2.6,
    }
    const text = formatEstimateMarkdown(estimate, ['testing'], [])
    expect(text).not.toContain('レンジ')
  })

  it('全項目をチェックボックスで表示する', () => {
    const estimate = {
      baseDays: 1,
      additionalDays: 0.3,
      subtotal: 1.3,
      uncertaintyMultiplier: 1.61,
      totalDays: 2.1,
      optimisticDays: 1.6,
      pessimisticDays: 2.6,
    }
    const text = formatEstimateMarkdown(estimate, ['testing'], ['new-tech'])
    // チェック済み項目は [x]、未チェック項目は [ ] で表示される
    expect(text).toContain('- [x] テスト: +0.3日')
    expect(text).toContain('- [ ] 調査・設計')
    expect(text).toContain('- [x] 未経験の技術 (高)')
    expect(text).toContain('- [ ] 仕様未確定 (高)')
  })
})
