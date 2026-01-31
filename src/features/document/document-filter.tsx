'use client'

import { parseAsString, useQueryState } from 'nuqs'
import { useTransition } from 'react'

import { SearchInput } from '@/components/forms/search-input'

import SortBySelect from './sort-by-select'

/**
 * DocumentFilter コンポーネント - ドキュメント一覧の検索とソート機能を提供します
 *
 * キーワード検索とソート順の変更を行えるフィルター機能を提供します。
 * nuqs を使用してURL状態を管理し、リアルタイムで検索結果を更新します。
 *
 * @returns 検索入力とソート順選択を含むフィルター要素
 */
export default function DocumentFilter() {
  const [isPending, startTransition] = useTransition()
  const [keyword, setKeyword] = useQueryState(
    'keyword',
    parseAsString.withDefault('').withOptions({
      shallow: false,
      history: 'push',
      throttleMs: 800,
      startTransition,
    })
  )

  return (
    <div
      className={`
        flex flex-col items-stretch gap-3
        sm:flex-row sm:items-center
      `}
    >
      <SortBySelect />
      <SearchInput
        className="min-w-64"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value || null)}
        placeholder="記事を検索..."
        aria-busy={isPending}
      />
    </div>
  )
}
