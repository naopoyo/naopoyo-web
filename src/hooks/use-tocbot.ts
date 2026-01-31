import { useCallback, useEffect } from 'react'
import tocbot from 'tocbot'

import { TOCBOT_BASE_OPTIONS } from '@/constants'
import { documentContentStyle } from '@/lib/hackersheet/style'

/**
 * ドキュメントコンテンツ用の DOM セレクタ
 * @internal
 */
const CONTENT_SELECTOR = `.${documentContentStyle.main}`

/**
 * useTocbot フックのオプション
 */
export interface UseTocbotOptions {
  /** 目次を挿入する要素のセレクタ */
  tocSelector: string
}

/**
 * useTocbot - tocbot を初期化・管理するカスタムフック
 *
 * tocbot ライブラリを使用して、ドキュメントのヘッディング構造から自動的に目次を生成します。
 * 以下の機能を提供します：
 * - ウィンドウのリサイズイベントに対応して目次を再生成
 * - MutationObserver でコンテンツの変更を監視し、Suspense ストリーミング後も正しく動作
 * - クリーンアップ時に tocbot を破棄
 *
 * @param options - useTocbot のオプション
 */
export function useTocbot({ tocSelector }: UseTocbotOptions): void {
  const initTocbot = useCallback(() => {
    tocbot.destroy()
    tocbot.init({
      ...TOCBOT_BASE_OPTIONS,
      tocSelector,
      contentSelector: CONTENT_SELECTOR,
    })
  }, [tocSelector])

  useEffect(() => {
    initTocbot()

    window.addEventListener('resize', initTocbot)

    // コンテンツ領域の DOM 変更を監視して tocbot を再初期化
    const contentElement = document.querySelector(CONTENT_SELECTOR)
    let observer: MutationObserver | null = null

    if (contentElement) {
      observer = new MutationObserver(() => {
        initTocbot()
      })
      observer.observe(contentElement, { childList: true, subtree: true })
    } else {
      // コンテンツがまだ存在しない場合は body を監視
      observer = new MutationObserver(() => {
        const content = document.querySelector(CONTENT_SELECTOR)
        if (content) {
          initTocbot()
          observer?.disconnect()
          // コンテンツが見つかったら、そのコンテンツを監視
          observer = new MutationObserver(() => {
            initTocbot()
          })
          observer.observe(content, { childList: true, subtree: true })
        }
      })
      observer.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      window.removeEventListener('resize', initTocbot)
      observer?.disconnect()
      tocbot.destroy()
    }
  }, [initTocbot])
}
