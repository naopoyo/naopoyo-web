'use client'

import { parseAsString, useQueryState } from 'nuqs'
import { useTransition } from 'react'

import { SearchInput } from '@/components/forms/search-input'

/**
 * BookmarkFilter コンポーネント - ブックマーク一覧の検索機能を提供します
 *
 * キーワード検索を行えるフィルター機能を提供します。
 * nuqs を使用してURL状態を管理し、リアルタイムで検索結果を更新します。
 *
 * @returns 検索入力を含むフィルター要素
 */
export default function BookmarkFilter() {
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
    <SearchInput
      className="w-full"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value || null)}
      placeholder="ブックマークを検索..."
      aria-label="ブックマーク検索キーワード"
      aria-busy={isPending}
    />
  )
}
