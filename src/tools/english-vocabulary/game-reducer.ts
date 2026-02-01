/**
 * 英単語クイズのゲーム状態管理 Reducer
 */

import { shuffleIndices } from './utils'

import type { GameAction, GameState } from './types'

/** ゲーム初期状態 */
export const initialState: GameState = {
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
 *
 * クイズの各アクション（開始、回答選択、次問、リセット）に応じて
 * ゲーム状態を更新します
 *
 * @param state - 現在のゲーム状態
 * @param action - 実行するアクション
 * @returns 新しいゲーム状態
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
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
