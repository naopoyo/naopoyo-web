'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTocbot } from '@/hooks'
import tocStyles from '@/styles/document-toc.module.scss'

/**
 * 目次用の DOM セレクタ
 * @internal
 */
const TOC_SELECTOR = `.${tocStyles['dropdown']}`

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
 * MutationObserver でコンテンツの変更を監視し、Suspense ストリーミング後も正しく動作します。
 *
 * @returns 目次用の nav 要素
 */
function Toc() {
  useTocbot({ tocSelector: TOC_SELECTOR })

  return <nav className={tocStyles['dropdown']} />
}
