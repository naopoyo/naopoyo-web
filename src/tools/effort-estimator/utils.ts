/**
 * 工数見積もりツールのユーティリティ関数
 */

import { IMPACT_LABELS, PHASE_ITEMS, UNCERTAINTY_ITEMS, UNCERTAINTY_K } from './constants'

import type { EstimateBreakdown } from './types'

/**
 * 小数第1位に四捨五入する
 */
export function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10
}

/**
 * 工数見積もりを計算する
 *
 * 1. ベース工数に追加作業の割合を加算
 * 2. 不確実性係数を乗算
 * 3. 0.1日単位で切り上げ
 *
 * @param baseDays - 直感的な実装工数（日）
 * @param checkedPhases - チェックされた追加作業の ID 配列
 * @param checkedUncertainties - チェックされた不確実性要因の ID 配列
 * @returns 見積もり結果の内訳
 */
export function calculateEstimate(
  baseDays: number,
  checkedPhases: string[],
  checkedUncertainties: string[]
): EstimateBreakdown {
  if (isNaN(baseDays) || baseDays <= 0) {
    return {
      baseDays: 0,
      additionalDays: 0,
      subtotal: 0,
      uncertaintyMultiplier: 1,
      totalDays: 0,
      optimisticDays: 0,
      pessimisticDays: 0,
    }
  }

  const totalRatio = checkedPhases.reduce((sum, id) => {
    const item = PHASE_ITEMS.find((p) => p.id === id)
    return sum + (item?.ratio ?? 0)
  }, 0)

  const additionalDays = baseDays * totalRatio
  const subtotal = baseDays + additionalDays

  const totalWeight = checkedUncertainties.reduce((sum, id) => {
    const item = UNCERTAINTY_ITEMS.find((u) => u.id === id)
    return sum + (item?.weight ?? 0)
  }, 0)

  const uncertaintyMultiplier = totalWeight > 0 ? 1 + UNCERTAINTY_K * Math.log(1 + totalWeight) : 1

  const rawTotal = subtotal * uncertaintyMultiplier
  const totalDays = totalWeight > 0 ? Math.ceil(rawTotal * 10) / 10 : roundToOneDecimal(rawTotal)

  const sqrtMultiplier = Math.sqrt(uncertaintyMultiplier)
  const optimisticDays = Math.floor((rawTotal / sqrtMultiplier) * 10) / 10
  const pessimisticDays = Math.ceil(rawTotal * sqrtMultiplier * 10) / 10

  return {
    baseDays,
    additionalDays: roundToOneDecimal(additionalDays),
    subtotal: roundToOneDecimal(subtotal),
    uncertaintyMultiplier: Math.round(uncertaintyMultiplier * 100) / 100,
    totalDays,
    optimisticDays,
    pessimisticDays,
  }
}

/**
 * 見積もり結果を Markdown テキストに整形する
 *
 * @param estimate - 見積もり結果
 * @param checkedPhases - チェックされた追加作業の ID 配列
 * @param checkedUncertainties - チェックされた不確実性要因の ID 配列
 * @returns クリップボードコピー用の Markdown テキスト
 */
export function formatEstimateMarkdown(
  estimate: EstimateBreakdown,
  checkedPhases: string[],
  checkedUncertainties: string[]
): string {
  const hasRange = estimate.uncertaintyMultiplier > 1

  const lines = [
    `# ■ 工数見積もり`,
    ``,
    `実装工数（直感）: ${estimate.baseDays}日`,
    `最終見積もり: ${estimate.totalDays}日`,
    `ベースとの比率: ×${roundToOneDecimal(estimate.totalDays / estimate.baseDays)}`,
    ...(hasRange ? [`レンジ: ${estimate.optimisticDays}日 〜 ${estimate.pessimisticDays}日`] : []),
    ``,
    `---`,
    ``,
    `追加作業: +${estimate.additionalDays}日`,
    ``,
    ...PHASE_ITEMS.map((item) => {
      const checked = checkedPhases.includes(item.id)
      const mark = checked ? 'x' : ' '
      const days = checked ? `: +${roundToOneDecimal(estimate.baseDays * item.ratio)}日` : ''
      return `- [${mark}] ${item.resultLabel}${days}`
    }),
    ``,
    `小計: ${estimate.subtotal}日`,
    ``,
    `---`,
    ``,
    `不確実性係数: ×${estimate.uncertaintyMultiplier}`,
    ``,
    ...UNCERTAINTY_ITEMS.map((item) => {
      const checked = checkedUncertainties.includes(item.id)
      const mark = checked ? 'x' : ' '
      return `- [${mark}] ${item.resultLabel} (${IMPACT_LABELS[item.impact]})`
    }),
  ]

  return lines.join('\n')
}
