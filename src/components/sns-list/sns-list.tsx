import NextLink from 'next/link'

import { FlexRow } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function SnsList() {
  return (
    <FlexRow className="gap-2">
      <Button className="rounded-full border" variant="ghost" size="icon" asChild>
        <NextLink href="https://github.com/naopoyo" aria-label="GitHubへのLink">
          <svg viewBox="0 0 98 96" className="size-[24px] dark:hidden">
            <use xlinkHref="/github-mark.svg#a"></use>
          </svg>
          <svg viewBox="0 0 98 96" className="hidden size-[24px] dark:block">
            <use xlinkHref="/github-mark-white.svg#a"></use>
          </svg>
        </NextLink>
      </Button>
      <Button className="rounded-full border" variant="ghost" size="icon" asChild>
        <NextLink href="https://twitter.com/naopoyo_tw" aria-label="XへのLink">
          <svg viewBox="0 0 300 300.251" className="size-[18px] fill-foreground">
            <use xlinkHref="/x-logo.svg#a"></use>
          </svg>
        </NextLink>
      </Button>
      <Button className="rounded-full border" variant="ghost" size="icon" asChild>
        <NextLink href="https://sizu.me/naopoyo" aria-label="しずかなインターネットへのLink">
          <svg className="size-[24px] fill-foreground">
            <use xlinkHref="/sizu-me-logo.svg#a"></use>
          </svg>
        </NextLink>
      </Button>
      <Button className="rounded-full border" variant="ghost" size="icon" asChild>
        <NextLink href="https://zenn.dev/naopoyo" aria-label="ZennへのLink">
          <svg className="size-[24px] fill-foreground">
            <use xlinkHref="/zenn-logo.svg#a"></use>
          </svg>
        </NextLink>
      </Button>
    </FlexRow>
  )
}
