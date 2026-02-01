/**
 * 英単語クイズ - クイズ画面コンポーネント
 */

import { Check, X } from 'lucide-react'
import React, { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/shadcn-utils'

import { CARD_CLASS, CHOICE_BUTTON_CLASS } from '../constants'

import type { GameState } from '../types'

interface QuizScreenProps {
  /** ゲームの状態 */
  state: GameState
  /** 選択肢がクリックされたときのハンドラー */
  onSelectChoice: (choiceIndex: number) => void
  /** 次の問題へボタンがクリックされたときのハンドラー */
  onNextQuestion: () => void
}

/**
 * クイズ画面コンポーネント
 *
 * 問題を表示し、選択肢から回答を選ぶことができます。
 * 回答後は解説と次へ進むボタンが表示されます
 */
export const QuizScreen = React.memo(function QuizScreen({
  state,
  onSelectChoice,
  onNextQuestion,
}: QuizScreenProps) {
  const handleChoiceClick = useCallback(
    (choiceIndex: number) => {
      onSelectChoice(choiceIndex)
    },
    [onSelectChoice]
  )

  const handleNextClick = useCallback(() => {
    onNextQuestion()
  }, [onNextQuestion])

  if (!state.currentSet) return null

  const questionIndex = state.shuffledQuestionIndices[state.currentQuestionIndex]
  const currentQuestion = state.currentSet.questions[questionIndex]
  const currentQuestionState = state.questionStates[state.currentQuestionIndex]
  const isCorrect = currentQuestionState.isCorrect

  return (
    <div className="w-full max-w-lg">
      <div className={cn(CARD_CLASS, 'flex w-full flex-col gap-6')}>
        {/* ヘッダー */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            問題 {state.currentQuestionIndex + 1} / {state.currentSet.questions.length}
          </span>
          <span className="font-medium">スコア: {state.totalScore}</span>
        </div>

        {/* 単語表示 */}
        <div className="py-4 text-center">
          <p className="text-3xl font-bold">{currentQuestion.word}</p>
        </div>

        {/* 選択肢 */}
        <div className="space-y-3">
          {state.shuffledChoiceIndices.map((originalIndex, displayIndex) => {
            const choice = currentQuestion.choices[originalIndex]
            const isWrong = currentQuestionState.wrongSelections.includes(displayIndex)
            const isAnswer = choice === currentQuestion.answer

            // 正解後は正解の選択肢のみ表示
            if (isCorrect && !isAnswer) {
              return null
            }

            return (
              <button
                key={displayIndex}
                onClick={() => handleChoiceClick(displayIndex)}
                disabled={isCorrect || isWrong}
                className={cn(
                  CHOICE_BUTTON_CLASS,
                  isWrong && 'border-red-500/50 bg-red-500/20 line-through opacity-60',
                  isCorrect && isAnswer && 'border-green-500/50 bg-green-500/20'
                )}
                aria-label={`選択肢: ${choice}`}
              >
                <span className="flex items-center justify-between">
                  {choice}
                  {isWrong && <X className="size-5 text-red-500" />}
                  {isCorrect && isAnswer && <Check className="size-5 text-green-500" />}
                </span>
              </button>
            )
          })}
        </div>

        {/* 解説（正解後） */}
        {isCorrect && (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted/30 p-4">
              <p className="mb-2 font-medium">解説</p>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>

            <Button size="lg" onClick={handleNextClick} className="w-full py-6 text-lg">
              {state.currentQuestionIndex < state.currentSet.questions.length - 1
                ? '次の問題へ'
                : '結果を見る'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
})
