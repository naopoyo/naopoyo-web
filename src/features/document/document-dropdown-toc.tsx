'use client'

import { useCallback, useEffect } from 'react'
import tocbot from 'tocbot'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TOCBOT_BASE_OPTIONS } from '@/constants'
import { documentContentStyle } from '@/lib/hackersheet/style'
import tocStyles from '@/styles/document-toc.module.scss'

/**
 * 目次用の DOM セレクタ
 * @internal
 */
const TOC_SELECTOR = `.${tocStyles['dropdown']}`

/**
 * ドキュメントコンテンツ用の DOM セレクタ
 * @internal
 */
const CONTENT_SELECTOR = `.${documentContentStyle.main}`

/**
 * DocumentDropdownToc コンポーネント - ドキュメントの目次をドロップダウンメニューで表示します
 *
 * ドロップダウン形式で目次を表示し、ページ内のナビゲーションを提供します。
 * tocbot ライブラリを使用して、ドキュメントのヘッディングから自動的に目次を生成します。
 *
 * @returns 目次ボタンとドロップダウンメニューを含む JSX 要素
 */
export default function DocumentDropdownToc() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          目次
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[70vh] w-screen bg-background" align="end">
        <Toc />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Toc コンポーネント - 目次のナビゲーション要素を初期化・管理します
 *
 * tocbot ライブラリを初期化して、ドキュメントのヘッディング構造から目次を自動生成します。
 * ウィンドウのリサイズイベントに対応して、目次の位置を更新します。
 *
 * @returns 目次用の nav 要素
 */
function Toc() {
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

  return <nav className={tocStyles['dropdown']} />
}
