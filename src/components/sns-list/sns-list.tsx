import NextLink from 'next/link'

import { FlexRow } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function SnsList() {
  return (
    <FlexRow className="gap-2">
      <Button variant="ghost" size="icon" asChild>
        <NextLink href="https://github.com/naopoyo" aria-label="GitHubのLink">
          <svg viewBox="0 0 98 96" className="size-[24px] dark:hidden">
            <use xlinkHref="/github-mark.svg#a"></use>
          </svg>
          <svg viewBox="0 0 98 96" className="hidden size-[24px] dark:block">
            <use xlinkHref="/github-mark-white.svg#a"></use>
          </svg>
        </NextLink>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <NextLink href="https://twitter.com/naopoyo_tw" aria-label="XのLink">
          <svg viewBox="0 0 300 300.251" className="size-[24px] fill-foreground">
            <use xlinkHref="/x-logo.svg#a"></use>
          </svg>
        </NextLink>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <NextLink href="https://sizu.me/naopoyo" aria-label="しずかなインターネットのLink">
          <svg className="size-[24px] fill-foreground">
            <use xlinkHref="/sizu-me-logo.svg#a"></use>
          </svg>
        </NextLink>
      </Button>
    </FlexRow>
  )
}
