import NextLink from 'next/link'
import { SiGithub, SiX, SiZenn } from 'react-icons/si'

import { FlexRow } from '@/components/layout'
import { Button } from '@/components/ui/button'

export default function SnsList() {
  return (
    <FlexRow className="gap-2">
      <Button className="rounded-full border" variant="ghost" size="icon" asChild>
        <NextLink href="https://github.com/naopoyo" aria-label="GitHubへのLink">
          <SiGithub size={24} />
        </NextLink>
      </Button>
      <Button className="rounded-full border" variant="ghost" size="icon" asChild>
        <NextLink href="https://twitter.com/naopoyo_tw" aria-label="XへのLink">
          <SiX size={20} />
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
          <SiZenn size={20} />
        </NextLink>
      </Button>
    </FlexRow>
  )
}
