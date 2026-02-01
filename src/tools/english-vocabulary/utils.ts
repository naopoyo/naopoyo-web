/**
 * 英単語クイズのユーティリティ関数
 */

import { parse } from 'yaml'

import { QUESTION_SET_FILES } from './constants'

import type { QuestionSet } from './types'

/**
 * インデックス配列をシャッフルする
 *
 * Fisher-Yates アルゴリズムを使用して配列をランダムにシャッフルします
 *
 * @param length - シャッフルする配列の長さ
 * @returns シャッフルされたインデックス配列
 */
export function shuffleIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  return indices
}

/**
 * 問題集をfetchして取得する
 *
 * 指定されたファイル名から YAML 形式の問題集を取得します
 *
 * @param fileName - 問題集ファイル名
 * @returns パースされた問題集データ
 * @throws ネットワークエラーまたはパースエラー
 */
export async function fetchQuestionSet(fileName: string): Promise<QuestionSet> {
  const response = await fetch(`/english-vocabulary-data/${fileName}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch question set: ${fileName}`)
  }
  const yamlText = await response.text()
  return parse(yamlText) as QuestionSet
}

/**
 * ランダムに問題集を1つ取得する
 *
 * 利用可能な問題集からランダムに1つ選択して取得します
 *
 * @returns ランダムに選択された問題集データ
 * @throws ネットワークエラーまたはパースエラー
 */
export async function getRandomQuestionSet(): Promise<QuestionSet> {
  const index = Math.floor(Math.random() * QUESTION_SET_FILES.length)
  return fetchQuestionSet(QUESTION_SET_FILES[index])
}
