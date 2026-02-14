/**
 * 工数見積もりツールの型定義
 */

/** チェック項目の定義 */
export type CheckItem = {
  id: string
  /** チェックリストに表示するラベル */
  label: string
  /** 結果の内訳に表示する短いラベル */
  resultLabel: string
  description: string
  /** 追加工数の係数（ベース工数に対する割合） */
  ratio: number
  /** 初期状態でチェックONにするか */
  defaultChecked?: boolean
}

/** 不確実性の影響度 */
export type ImpactLevel = 'high' | 'medium' | 'low'

/** 不確実性要因の定義 */
export type UncertaintyItem = {
  id: string
  /** チェックリストに表示するラベル */
  label: string
  /** 結果の内訳に表示する短いラベル */
  resultLabel: string
  description: string
  /** 影響度（高/中/低） */
  impact: ImpactLevel
  /** 対数モデルで使用する超過値（高: 0.5, 中: 0.3, 低: 0.2） */
  weight: number
}

/** 見積もり結果の内訳 */
export type EstimateBreakdown = {
  /** 入力されたベース工数（日） */
  baseDays: number
  /** 追加作業の合計（日） */
  additionalDays: number
  /** 不確実性を加味する前の小計（日） */
  subtotal: number
  /** 不確実性の乗数 */
  uncertaintyMultiplier: number
  /** 最終見積もり（日） */
  totalDays: number
  /** 楽観値（日）。不確実性がない場合は totalDays と同値 */
  optimisticDays: number
  /** 悲観値（日）。不確実性がない場合は totalDays と同値 */
  pessimisticDays: number
}
