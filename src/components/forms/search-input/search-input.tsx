import { Search } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/shadcn-utils'

import { Input } from '../ui/input'

/**
 * SearchInput コンポーネントの Props
 */
export type SearchInputProps = Omit<React.ComponentProps<'input'>, 'type'>

/**
 * SearchInput コンポーネント - 検索アイコン付きの検索入力欄
 *
 * 検索アイコンを左側に配置し、ホバー・フォーカス時のトランジション効果を持つ
 * 検索専用の入力コンポーネントです。
 *
 * @param props - SearchInputProps（input要素のpropsからtypeを除いたもの）
 * @returns 検索アイコン付きの入力要素
 */
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Search
          className={`
            pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2
            text-muted-foreground transition-colors
          `}
          aria-hidden="true"
        />
        <Input
          type="search"
          className={cn(
            `
              w-full border-border/50 bg-muted/30 pl-10 text-base transition-all duration-200
              placeholder:text-muted-foreground/60
              hover:border-border hover:bg-muted/50
              focus:border-primary/50 focus:bg-background
              focus:shadow-[0_0_0_3px_rgba(var(--primary),0.1)]
            `,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'

export default SearchInput
