/**
 * 英単語クイズ - 結果画面コンポーネント
 */

import { Check, RotateCcw, X } from 'lucide-react'
import React, { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/shadcn-utils'

import { CARD_CLASS } from '../constants'

import type { GameState } from '../types'

interface ResultScreenProps {
  /** ゲームの状態 */
  state: GameState
  /** リセットボタンがクリックされたときのハンドラー */
  onReset: () => void
}

/**
 * 結果画面コンポーネント
 *
 * クイズ完了後に最終スコアと詳細結果を表示します
 */
export const ResultScreen = React.memo(function ResultScreen({
  state,
  onReset,
}: ResultScreenProps) {
  const handleResetClick = useCallback(() => {
    onReset()
  }, [onReset])

  const { perfectCount, missCount } = state.questionStates.reduce(
    (acc, qs) => {
      if (qs.wrongSelections.length === 0) {
        acc.perfectCount++
      } else {
        acc.missCount++
      }
      return acc
    },
    { perfectCount: 0, missCount: 0 }
  )

  return (
    <div className="w-full max-w-lg">
      <div
        className={cn(
          CARD_CLASS,
          'flex w-full flex-col items-center justify-center gap-6 text-center'
        )}
      >
        <h1 className="text-3xl font-bold">クイズ終了</h1>

        <div className="space-y-2">
          <p className="text-muted-foreground">最終スコア</p>
          <p className="text-5xl font-bold text-primary">{state.totalScore} 点</p>
        </div>

        <div className="w-full space-y-2 rounded-lg bg-muted/30 p-4 text-left">
          <p className="font-medium">結果詳細</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-green-500" />
              一発正解: {perfectCount}問
            </li>
            <li className="flex items-center gap-2">
              <X className="size-4 text-red-500" />
              ミスあり: {missCount}問
            </li>
          </ul>
        </div>

        <Button size="lg" onClick={handleResetClick} className="gap-2 px-8 py-6 text-lg">
          <RotateCcw className="size-5" />
          もう一度挑戦
        </Button>
      </div>
    </div>
  )
})
