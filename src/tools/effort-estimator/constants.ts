/**
 * 工数見積もりツールの定数
 */

import type { CheckItem, ImpactLevel, UncertaintyItem } from './types'

/**
 * 追加作業のチェック項目
 *
 * 係数の根拠: docs/effort-estimator-research.md を参照
 */
export const PHASE_ITEMS: CheckItem[] = [
  {
    id: 'testing',
    label: 'テストを書く・直す',
    resultLabel: 'テスト',
    description: 'ユニットテスト・結合テストの作成や既存テストの修正',
    ratio: 0.3,
    defaultChecked: true,
  },
  {
    id: 'review',
    label: 'レビュー対応がある',
    resultLabel: 'レビュー対応',
    description: 'コードレビューで指摘をもらい、修正する',
    ratio: 0.25,
    defaultChecked: true,
  },
  {
    id: 'investigation',
    label: '調査・設計が必要',
    resultLabel: '調査・設計',
    description: '既存コードの理解や設計方針の検討',
    ratio: 0.2,
  },
  {
    id: 'qa',
    label: 'QA・動作確認がある',
    resultLabel: 'QA・動作確認',
    description: 'テスト環境での検証やバグ修正の対応',
    ratio: 0.2,
  },
  {
    id: 'documentation',
    label: 'ドキュメントや仕様書の更新がある',
    resultLabel: 'ドキュメント更新',
    description: 'API ドキュメント、README、仕様書などの更新',
    ratio: 0.15,
  },
  {
    id: 'communication',
    label: 'ミーティング・関係者との調整がある',
    resultLabel: 'ミーティング・調整',
    description: '仕様の確認、進捗共有、他チームとの調整',
    ratio: 0.15,
  },
  {
    id: 'deploy',
    label: '環境構築・デプロイ作業がある',
    resultLabel: '環境構築・デプロイ',
    description: '設定変更、マイグレーション、リリース手順など',
    ratio: 0.15,
  },
]

/**
 * 不確実性要因のチェック項目
 *
 * 対数逓減モデル: 合成係数 = 1 + K × ln(1 + Σweight)
 * 影響度と超過値の対応: 高=0.5, 中=0.3, 低=0.2
 * 係数の根拠: docs/effort-estimator-research.md を参照
 */
export const UNCERTAINTY_ITEMS: UncertaintyItem[] = [
  {
    id: 'new-tech',
    label: '初めて触る技術がある',
    resultLabel: '未経験の技術',
    description: '使ったことのないライブラリやフレームワーク',
    impact: 'high',
    weight: 0.5,
  },
  {
    id: 'unclear-requirements',
    label: '仕様がまだ固まっていない',
    resultLabel: '仕様未確定',
    description: '途中で要件が変わる・確認待ちが発生しそう',
    impact: 'high',
    weight: 0.5,
  },
  {
    id: 'external-dependency',
    label: '外部の人やシステムに依存する',
    resultLabel: '外部依存',
    description: '他チームの API 待ちや外部サービスとの連携',
    impact: 'medium',
    weight: 0.3,
  },
  {
    id: 'parallel-tasks',
    label: '他のタスクと並行して進める',
    resultLabel: '並行タスク',
    description: '週の50%以上を他タスクに割いている',
    impact: 'medium',
    weight: 0.3,
  },
  {
    id: 'legacy-code',
    label: 'レガシーコードを触る',
    resultLabel: 'レガシーコード',
    description: '古くて複雑なコード、テストがない領域の変更',
    impact: 'medium',
    weight: 0.3,
  },
  {
    id: 'wide-impact',
    label: '影響範囲が広い',
    resultLabel: '影響範囲大',
    description: '3つ以上の画面や機能に変更が波及する',
    impact: 'low',
    weight: 0.2,
  },
]

/** 対数逓減モデルの調整パラメータ */
export const UNCERTAINTY_K = 1.5

/** 影響度の表示ラベル */
export const IMPACT_LABELS: Record<ImpactLevel, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

/** セクションカードの CSS クラス */
export const SECTION_CARD_CLASS = `
  flex flex-col gap-4 rounded-xl border border-border/30 bg-background p-5
`

/** 結果表示カードの CSS クラス */
export const RESULT_CARD_CLASS = `
  flex flex-col gap-4 rounded-xl border border-border/30 bg-muted/20 p-5
`

/** チェックアイテム行の CSS クラス */
export const CHECK_ITEM_CLASS = `
  flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150
  hover:bg-muted/50
`

/** 使い方セクションの CSS クラス */
export const USAGE_SECTION_CLASS = `
  mx-auto flex max-w-md flex-col gap-3 rounded-xl border border-border/30 bg-muted/30 p-5
`
