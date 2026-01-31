'use client'

import { Check, Loader2, RotateCcw, X } from 'lucide-react'
import { useCallback, useReducer, useState } from 'react'
import { parse } from 'yaml'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/shadcn-utils'

import type { GameAction, GameState, QuestionSet } from './types'

import { FlowingGlow } from '@/components/effects'

/** 利用可能な問題集ファイル名 */
const QUESTION_SET_FILES = [
  'set-001.yaml',
  'set-002.yaml',
  'set-003.yaml',
  'set-004.yaml',
  'set-005.yaml',
  'set-006.yaml',
  'set-007.yaml',
  'set-008.yaml',
  'set-009.yaml',
  'set-010.yaml',
] as const

/**
 * インデックス配列をシャッフルする
 */
function shuffleIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  return indices
}

/** 初期状態 */
const initialState: GameState = {
  quizState: 'idle',
  currentSet: null,
  currentQuestionIndex: 0,
  questionStates: [],
  totalScore: 0,
  shuffledQuestionIndices: [],
  shuffledChoiceIndices: [],
}

/**
 * ゲーム状態のReducer
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_QUIZ': {
      const questionSet = action.payload
      const questionStates = questionSet.questions.map((_, index) => ({
        questionIndex: index,
        wrongSelections: [],
        isCorrect: false,
      }))
      return {
        ...state,
        quizState: 'playing',
        currentSet: questionSet,
        currentQuestionIndex: 0,
        questionStates,
        totalScore: 0,
        shuffledQuestionIndices: shuffleIndices(questionSet.questions.length),
        shuffledChoiceIndices: shuffleIndices(4),
      }
    }

    case 'SELECT_CHOICE': {
      if (!state.currentSet) return state

      const questionIndex = state.shuffledQuestionIndices[state.currentQuestionIndex]
      const currentQuestion = state.currentSet.questions[questionIndex]
      const choiceIndex = action.payload
      const originalIndex = state.shuffledChoiceIndices[choiceIndex]
      const selectedChoice = currentQuestion.choices[originalIndex]
      const currentQuestionState = state.questionStates[state.currentQuestionIndex]

      if (selectedChoice === currentQuestion.answer) {
        // 正解
        const scoreGain = currentQuestionState.wrongSelections.length === 0 ? 10 : 0
        const newQuestionStates = [...state.questionStates]
        newQuestionStates[state.currentQuestionIndex] = {
          ...currentQuestionState,
          isCorrect: true,
        }
        return {
          ...state,
          totalScore: state.totalScore + scoreGain,
          questionStates: newQuestionStates,
        }
      } else {
        // 不正解
        const newQuestionStates = [...state.questionStates]
        newQuestionStates[state.currentQuestionIndex] = {
          ...currentQuestionState,
          wrongSelections: [...currentQuestionState.wrongSelections, choiceIndex],
        }
        return {
          ...state,
          totalScore: state.totalScore - 1,
          questionStates: newQuestionStates,
        }
      }
    }

    case 'NEXT_QUESTION': {
      if (!state.currentSet) return state

      const nextIndex = state.currentQuestionIndex + 1
      if (nextIndex >= state.currentSet.questions.length) {
        return {
          ...state,
          quizState: 'result',
        }
      }
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        shuffledChoiceIndices: shuffleIndices(4),
      }
    }

    case 'RESET':
      return initialState

    default:
      return state
  }
}

/**
 * 問題集をfetchして取得する
 */
async function fetchQuestionSet(fileName: string): Promise<QuestionSet> {
  const response = await fetch(`/english-vocabulary-data/${fileName}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch question set: ${fileName}`)
  }
  const yamlText = await response.text()
  return parse(yamlText) as QuestionSet
}

/**
 * ランダムに問題集を1つ取得する
 */
async function getRandomQuestionSet(): Promise<QuestionSet> {
  const index = Math.floor(Math.random() * QUESTION_SET_FILES.length)
  return fetchQuestionSet(QUESTION_SET_FILES[index])
}

// スタイル定数
const CARD_CLASS = `
  min-h-145 rounded-2xl border border-border/50 bg-card/80 p-8 shadow-lg backdrop-blur-sm
`

const CHOICE_BUTTON_CLASS = `
  w-full cursor-pointer rounded-xl border border-border/50 bg-card/60 px-6 py-4 text-left text-lg
  font-medium transition-all duration-200
  hover:border-foreground/20 hover:bg-card/90 hover:shadow-md
  focus:ring-2 focus:ring-primary/50 focus:outline-none
  disabled:cursor-not-allowed disabled:opacity-50
`

/**
 * 英単語クイズコンポーネント
 */
export default function EnglishVocabulary() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartQuiz = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const questionSet = await getRandomQuestionSet()
      dispatch({ type: 'START_QUIZ', payload: questionSet })
    } catch {
      setError('問題集の読み込みに失敗しました')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSelectChoice = useCallback((choiceIndex: number) => {
    dispatch({ type: 'SELECT_CHOICE', payload: choiceIndex })
  }, [])

  const handleNextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' })
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  // スタート画面
  if (state.quizState === 'idle') {
    return (
      <FlowingGlow className="relative w-full max-w-lg">
        <div
          className={cn(
            CARD_CLASS,
            'flex w-full flex-col items-center justify-center gap-6 text-center'
          )}
        >
          <h1 className="text-3xl font-bold">英単語クイズ</h1>
          <p className="text-muted-foreground">
            英単語・イディオム・句動詞の
            <br />
            意味を4択から選んでください
          </p>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-4 py-2 text-destructive">{error}</div>
          )}

          <Button
            size="lg"
            onClick={handleStartQuiz}
            disabled={isLoading}
            className="gap-2 px-8 py-6 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                読み込み中...
              </>
            ) : (
              'クイズを開始'
            )}
          </Button>

          <div className="mt-4 space-y-2 text-left text-sm text-muted-foreground">
            <p className="font-medium text-foreground">使い方</p>
            <ul className="list-inside list-disc space-y-1">
              <li>問題は全10問です</li>
              <li>正解を一発で選ぶと10点獲得</li>
              <li>間違えるたびに1点減点</li>
              <li>正解するまで次に進めません</li>
            </ul>
          </div>
        </div>
      </FlowingGlow>
    )
  }

  // 結果画面
  if (state.quizState === 'result') {
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
      <FlowingGlow className="relative w-full max-w-lg">
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

          <div className="w-full space-y-2 rounded-lg bg-muted/50 p-4 text-left">
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

          <Button size="lg" onClick={handleReset} className="gap-2 px-8 py-6 text-lg">
            <RotateCcw className="size-5" />
            もう一度挑戦
          </Button>
        </div>
      </FlowingGlow>
    )
  }

  // クイズ画面
  const questionIndex = state.shuffledQuestionIndices[state.currentQuestionIndex]
  const currentQuestion = state.currentSet!.questions[questionIndex]
  const currentQuestionState = state.questionStates[state.currentQuestionIndex]
  const isCorrect = currentQuestionState.isCorrect

  return (
    <FlowingGlow className="relative w-full max-w-lg">
      <div className={cn(CARD_CLASS, 'flex w-full flex-col gap-6')}>
        {/* ヘッダー */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            問題 {state.currentQuestionIndex + 1} / {state.currentSet!.questions.length}
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
                onClick={() => handleSelectChoice(displayIndex)}
                disabled={isCorrect || isWrong}
                className={cn(
                  CHOICE_BUTTON_CLASS,
                  isWrong && 'border-red-500/50 bg-red-500/10 line-through opacity-60',
                  isCorrect &&
                    isAnswer &&
                    'animate-[choice-correct_0.3s_ease-out] border-green-500/50 bg-green-500/10'
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
          <div className="animate-in space-y-4 duration-300 fade-in slide-in-from-bottom-2">
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="mb-2 font-medium">解説</p>
              <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
            </div>

            <Button size="lg" onClick={handleNextQuestion} className="w-full py-6 text-lg">
              {state.currentQuestionIndex < state.currentSet!.questions.length - 1
                ? '次の問題へ'
                : '結果を見る'}
            </Button>
          </div>
        )}
      </div>
    </FlowingGlow>
  )
}
