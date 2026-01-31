'use client'

import { useTocbot } from '@/hooks'
import tocStyles from '@/styles/document-toc.module.scss'

/**
 * 目次用の DOM セレクタ
 * @internal
 */
const TOC_SELECTOR = `.${tocStyles.main}`

/**
 * DocumentToc コンポーネント - ドキュメントの目次をサイドバーに表示します
 *
 * tocbot ライブラリを使用して、ドキュメントのヘッディング構造から自動的に目次を生成し、
 * ページ内のナビゲーションを提供します。
 * ウィンドウのリサイズイベントに対応して、目次の位置を自動更新します。
 * MutationObserver でコンテンツの変更を監視し、Suspense ストリーミング後も正しく動作します。
 *
 * @returns 目次用の nav 要素
 */
export default function DocumentToc() {
  useTocbot({ tocSelector: TOC_SELECTOR })

  return <nav className={tocStyles.main} />
}
