'use client'

import { useCallback, useReducer, useState } from 'react'

import { QuizScreen, ResultScreen, StartScreen } from './components'
import { gameReducer, initialState } from './game-reducer'
import { getRandomQuestionSet } from './utils'

/**
 * 英単語クイズコンポーネント
 *
 * 4択形式の英単語クイズを提供します。
 * 複数の問題集からランダムに出題され、スコア計算と詳細な結果表示が可能です
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
    return <StartScreen onStart={handleStartQuiz} isLoading={isLoading} error={error} />
  }

  // 結果画面
  if (state.quizState === 'result') {
    return <ResultScreen state={state} onReset={handleReset} />
  }

  // クイズ画面
  return (
    <QuizScreen
      state={state}
      onSelectChoice={handleSelectChoice}
      onNextQuestion={handleNextQuestion}
    />
  )
}
