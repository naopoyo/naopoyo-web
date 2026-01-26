'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select'
import { useCreateQueryString } from '@/hooks'

/**
 * SortBySelect コンポーネントの Props
 */
export type SortBySelectProps = {
  /** 現在選択されているソート順（'published_at' または 'modified_at'） */
  sortBy?: string
}

/**
 * ドキュメントの並び順オプション
 * @internal
 */
const SORT_OPTIONS = [
  { value: 'published_at', label: '最近公開された' },
  { value: 'modified_at', label: '最近更新された' },
] as const

/**
 * SortBySelect コンポーネント - ドキュメントのソート順を選択するセレクトボックスです
 *
 * ドキュメント一覧のソート順を変更でき、選択すると URL クエリパラメータを更新して
 * ドキュメント一覧を再取得します。
 *
 * @param props - SortBySelectProps
 * @returns ソート順選択用のセレクトボックス要素
 */
export default function SortBySelect({ sortBy }: SortBySelectProps) {
  const router = useRouter()
  const createQueryString = useCreateQueryString({ withPathname: true })
  const handleValueChange = useCallback(
    (value: string) => {
      router.push(createQueryString({ by: value }))
    },
    [router, createQueryString]
  )

  return (
    <Select value={sortBy} onValueChange={handleValueChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="並び順" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>並び順</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
