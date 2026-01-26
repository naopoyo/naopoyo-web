'use client'

import { useCallback, useEffect } from 'react'
import tocbot from 'tocbot'

import { TOCBOT_BASE_OPTIONS } from '@/constants'
import { documentContentStyle } from '@/lib/hackersheet/style'
import tocStyles from '@/styles/document-toc.module.scss'

/**
 * 目次用の DOM セレクタ
 * @internal
 */
const TOC_SELECTOR = `.${tocStyles.main}`

/**
 * ドキュメントコンテンツ用の DOM セレクタ
 * @internal
 */
const CONTENT_SELECTOR = `.${documentContentStyle.main}`

/**
 * DocumentToc コンポーネント - ドキュメントの目次をサイドバーに表示します
 *
 * tocbot ライブラリを使用して、ドキュメントのヘッディング構造から自動的に目次を生成し、
 * ページ内のナビゲーションを提供します。
 * ウィンドウのリサイズイベントに対応して、目次の位置を自動更新します。
 *
 * @returns 目次用の nav 要素
 */
export default function DocumentToc() {
  const initTocbot = useCallback(() => {
    tocbot.init({
      ...TOCBOT_BASE_OPTIONS,
      tocSelector: TOC_SELECTOR,
      contentSelector: CONTENT_SELECTOR,
    })
  }, [])

  useEffect(() => {
    initTocbot()

    window.addEventListener('resize', initTocbot)

    return () => {
      window.removeEventListener('resize', initTocbot)
      tocbot.destroy()
    }
  }, [initTocbot])

  return <nav className={tocStyles.main} />
}
