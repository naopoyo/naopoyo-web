'use client'

import { CalculatorIcon, ClipboardCopyIcon, CheckIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

import {
  CHECK_ITEM_CLASS,
  IMPACT_LABELS,
  PHASE_ITEMS,
  RESULT_CARD_CLASS,
  SECTION_CARD_CLASS,
  UNCERTAINTY_ITEMS,
  USAGE_SECTION_CLASS,
} from './constants'
import { calculateEstimate, formatEstimateMarkdown, roundToOneDecimal } from './utils'

/**
 * EffortEstimator コンポーネント
 *
 * 直感的な実装工数を入力し、チェックボックスで追加作業や
 * 不確実性要因を選択すると、現実的な工数見積もりを算出します。
 */
export default function EffortEstimator() {
  const [baseDays, setBaseDays] = useState('1')
  const [checkedPhases, setCheckedPhases] = useState<string[]>(() =>
    PHASE_ITEMS.filter((item) => item.defaultChecked).map((item) => item.id)
  )
  const [checkedUncertainties, setCheckedUncertainties] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const estimate = useMemo(
    () => calculateEstimate(parseFloat(baseDays) || 0, checkedPhases, checkedUncertainties),
    [baseDays, checkedPhases, checkedUncertainties]
  )

  /** 追加作業チェックの切り替え */
  const togglePhase = useCallback((id: string) => {
    setCheckedPhases((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }, [])

  /** 不確実性要因チェックの切り替え */
  const toggleUncertainty = useCallback((id: string) => {
    setCheckedUncertainties((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    )
  }, [])

  /** 結果をクリップボードにコピー */
  const handleCopy = useCallback(() => {
    if (estimate.totalDays <= 0) return

    navigator.clipboard.writeText(
      formatEstimateMarkdown(estimate, checkedPhases, checkedUncertainties)
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [estimate, checkedPhases, checkedUncertainties])

  const hasInput = parseFloat(baseDays) > 0

  return (
    <div
      className="
        flex w-full max-w-4xl flex-col gap-8 pb-16
        md:flex-row md:items-start md:gap-10 md:pb-0
      "
    >
      {/* 左カラム: 入力 */}
      <div
        className="
          flex w-full flex-col gap-8
          md:flex-1
        "
      >
        {/* ベース工数入力 */}
        <section
          className={`
            ${SECTION_CARD_CLASS}
            border-border/50 bg-muted/10
          `}
        >
          <header className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CalculatorIcon size={14} className="text-muted-foreground" />
            実装工数（直感）
          </header>
          <p className="text-sm text-muted-foreground">
            過去に似たタスクを実装したとき、実際にかかった日数を入力してください
          </p>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              value={baseDays}
              onChange={(e) => setBaseDays(e.target.value)}
              placeholder="1"
              min={0.5}
              step={0.5}
              className={`
                h-14 w-28 [appearance:textfield] border-border/30 bg-background text-center
                font-mono text-2xl font-bold tracking-tighter transition-colors duration-150
                focus:border-foreground/30 focus:bg-muted/30
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
              `}
            />
            <span className="text-lg text-muted-foreground">日</span>
          </div>
        </section>

        {/* 追加作業チェックリスト */}
        <section className={SECTION_CARD_CLASS}>
          <header className="text-sm font-medium text-foreground">追加作業</header>
          <p className="text-sm text-muted-foreground">実装以外に発生する作業をチェック</p>
          <div className="flex flex-col gap-1">
            {PHASE_ITEMS.map((item) => (
              <label key={item.id} className={CHECK_ITEM_CLASS}>
                <Checkbox
                  checked={checkedPhases.includes(item.id)}
                  onCheckedChange={() => togglePhase(item.id)}
                />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground/60">
                  +{Math.round(item.ratio * 100)}%
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* 不確実性要因 */}
        <section className={SECTION_CARD_CLASS}>
          <header className="text-sm font-medium text-foreground">不確実性</header>
          <p className="text-sm text-muted-foreground">
            リスク要因があればチェック（影響度に応じて係数が上がる）
          </p>
          <div className="flex flex-col gap-1">
            {UNCERTAINTY_ITEMS.map((item) => (
              <label key={item.id} className={CHECK_ITEM_CLASS}>
                <Checkbox
                  checked={checkedUncertainties.includes(item.id)}
                  onCheckedChange={() => toggleUncertainty(item.id)}
                />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
                <span className="text-xs text-muted-foreground/60">
                  影響度: {IMPACT_LABELS[item.impact]}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* 右カラム: 結果 + 使い方 */}
      <div
        className="
          flex w-full flex-col gap-8
          md:sticky md:top-8 md:w-80 md:shrink-0
        "
      >
        {/* 見積もり結果 */}
        {!hasInput && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            実装工数を入力すると見積もり結果が表示されます
          </p>
        )}
        {hasInput && (
          <section className={RESULT_CARD_CLASS}>
            <div className="flex items-center justify-between">
              <header className="text-sm font-medium text-foreground">見積もり結果</header>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="
                  h-8 gap-1.5 border-border/30 bg-background text-xs transition-colors duration-150
                  hover:bg-muted/50
                "
              >
                {copied ? (
                  <CheckIcon size={12} className="text-green-500" />
                ) : (
                  <ClipboardCopyIcon size={12} />
                )}
                コピー
              </Button>
            </div>

            {/* 内訳 */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>実装工数（直感）</span>
                <span className="font-mono">{estimate.baseDays}日</span>
              </div>

              {/* 追加作業の内訳 */}
              {checkedPhases.length > 0 && (
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>追加作業</span>
                    <span className="font-mono">+{estimate.additionalDays}日</span>
                  </div>
                  {PHASE_ITEMS.filter((item) => checkedPhases.includes(item.id)).map((item) => {
                    const days = roundToOneDecimal(estimate.baseDays * item.ratio)
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between pl-3 text-xs text-muted-foreground/70"
                      >
                        <span>{item.resultLabel}</span>
                        <span className="font-mono">+{days}日</span>
                      </div>
                    )
                  })}
                </div>
              )}
              {checkedPhases.length === 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>追加作業</span>
                  <span className="font-mono">+{estimate.additionalDays}日</span>
                </div>
              )}

              <div
                className="
                  flex justify-between border-t border-border/30 pt-2 text-muted-foreground
                "
              >
                <span>小計</span>
                <span className="font-mono">{estimate.subtotal}日</span>
              </div>

              {/* 不確実性の内訳 */}
              {estimate.uncertaintyMultiplier > 1 && (
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>不確実性係数</span>
                    <span className="font-mono">×{estimate.uncertaintyMultiplier}</span>
                  </div>
                  {UNCERTAINTY_ITEMS.filter((item) => checkedUncertainties.includes(item.id)).map(
                    (item) => (
                      <div
                        key={item.id}
                        className="flex justify-between pl-3 text-xs text-muted-foreground/70"
                      >
                        <span>{item.resultLabel}</span>
                        <span>({IMPACT_LABELS[item.impact]})</span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* 最終結果 */}
            <div className="flex items-baseline justify-between border-t border-border/30 pt-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">最終見積もり</span>
                {estimate.baseDays > 0 && (
                  <span className="font-mono text-xs text-muted-foreground/60">
                    ベースとの比率 ×{roundToOneDecimal(estimate.totalDays / estimate.baseDays)}
                  </span>
                )}
              </div>
              <span className="font-mono text-3xl font-bold tracking-tighter text-foreground">
                {estimate.totalDays}
                <span className="text-base font-normal text-muted-foreground">日</span>
              </span>
            </div>

            {/* レンジ表示 */}
            {estimate.uncertaintyMultiplier > 1 && (
              <div className="flex justify-between text-xs text-muted-foreground/70">
                <span>レンジ</span>
                <span className="font-mono">
                  {estimate.optimisticDays}日 〜 {estimate.pessimisticDays}日
                </span>
              </div>
            )}
          </section>
        )}

        {/* 使い方 */}
        <section className={USAGE_SECTION_CLASS}>
          <h2 className="text-sm font-medium text-foreground">使い方</h2>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">1.</span>
              <span>「実装だけなら何日？」という直感的な日数を入力</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">2.</span>
              <span>
                実装以外に発生する追加作業をチェック。該当する作業ごとにベース工数に対する割合が加算される
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">3.</span>
              <span>不確実性があればチェック。リスク要因が多いほど係数が上がる</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground/50">4.</span>
              <span>算出された見積もりをコピーして共有</span>
            </li>
          </ul>
          <div
            className="
              flex flex-col gap-2 border-t border-border/30 pt-3 text-xs text-muted-foreground/70
            "
          >
            <p>
              最終見積もり = (ベース + 追加作業) ×
              不確実性係数。追加作業はベース工数に対する割合で加算。不確実性は要因が増えるほど係数が上がるが、青天井にならない対数モデルで算出。
            </p>
            <p>
              レンジは不確実性係数の平方根で楽観値・悲観値を算出。不確実性が大きいほどレンジが広がり、不確実性なしではレンジは表示されない。
            </p>
            <p className="font-mono">不確実性係数 = 1 + 1.5 × ln(1 + 影響度の合計)</p>
          </div>
        </section>
      </div>

      {/* モバイル sticky バー */}
      {hasInput && (
        <div
          className="
            fixed inset-x-0 bottom-0 border-t border-border/30 bg-background px-4 py-3
            md:hidden
          "
        >
          <div className="mx-auto flex max-w-lg items-center justify-between">
            <span className="text-sm text-muted-foreground">最終見積もり</span>
            <span className="font-mono text-xl font-bold tracking-tighter text-foreground">
              {estimate.totalDays}
              <span className="text-sm font-normal text-muted-foreground">日</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
