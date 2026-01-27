'use client'

import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
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
  { value: 'published_at', label: '公開日順' },
  { value: 'modified_at', label: '更新日順' },
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
      <SelectTrigger
        className={`
          w-36 gap-2 border-border/50 bg-muted/30 transition-all duration-200
          hover:border-border hover:bg-muted/50
          focus:border-primary/50 focus:bg-background
          data-[state=open]:border-primary/50 data-[state=open]:bg-background
        `}
      >
        <ArrowUpDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <SelectValue placeholder="並び順" />
      </SelectTrigger>
      <SelectContent
        className={`border-border/50 bg-popover/95 shadow-lg backdrop-blur-sm`}
      >
        <SelectGroup>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={`
                cursor-pointer transition-colors duration-150
                focus:bg-primary/10 focus:text-foreground
              `}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
