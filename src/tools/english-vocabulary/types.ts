/**
 * 英単語クイズの型定義
 */

/** 問題データ */
export type Question = {
  /** 出題される単語・フレーズ */
  word: string
  /** 正解の意味 */
  answer: string
  /** 選択肢（4つ、正解を含む） */
  choices: [string, string, string, string]
  /** 解説文 */
  explanation: string
}

/** 問題集データ */
export type QuestionSet = {
  /** 問題集ID */
  id: string
  /** 問題集タイトル */
  title: string
  /** 問題リスト（10問） */
  questions: Question[]
}

/** クイズの状態 */
export type QuizState = 'idle' | 'playing' | 'result'

/** 各問題の回答状態 */
export type QuestionState = {
  /** 問題インデックス */
  questionIndex: number
  /** 選択した不正解の選択肢インデックス */
  wrongSelections: number[]
  /** 正解したかどうか */
  isCorrect: boolean
}

/** ゲーム全体の状態 */
export type GameState = {
  /** 現在のクイズ状態 */
  quizState: QuizState
  /** 現在の問題集 */
  currentSet: QuestionSet | null
  /** 現在の問題番号（0-9） */
  currentQuestionIndex: number
  /** 各問題の回答状態 */
  questionStates: QuestionState[]
  /** 合計スコア */
  totalScore: number
  /** シャッフルされた問題のインデックス配列 */
  shuffledQuestionIndices: number[]
  /** シャッフルされた選択肢のインデックス配列 */
  shuffledChoiceIndices: number[]
}

/** Reducer アクション */
export type GameAction =
  | { type: 'START_QUIZ'; payload: QuestionSet }
  | { type: 'SELECT_CHOICE'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESET' }
