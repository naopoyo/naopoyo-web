'use client'

import { useRouter } from 'next/navigation'

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

export type SortBySelectProps = {
  sortBy?: string
}

export default function SortBySelect({ sortBy }: SortBySelectProps) {
  const router = useRouter()
  const createQueryString = useCreateQueryString({ withPathname: true })
  const handleValueChange = (value: string) => {
    router.push(createQueryString({ by: value }))
  }

  return (
    <Select value={sortBy} onValueChange={handleValueChange}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="並び順" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>並び順</SelectLabel>
          <SelectItem value="published_at">最近公開された</SelectItem>
          <SelectItem value="modified_at">最近更新された</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
