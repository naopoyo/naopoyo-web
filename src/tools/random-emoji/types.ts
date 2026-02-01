/**
 * ランダム絵文字生成ツールの型定義
 */

/** アニメーション状態 */
export type AnimationState = 'idle' | 'spinning' | 'bouncing'

/** コピー成功時のフィードバック状態 */
export type CopyFeedback = {
  show: boolean
  emoji: string
}
