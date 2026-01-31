import { SiGithub, SiX, SiZenn } from 'react-icons/si'

import { NextLink } from '@/components/navigations/link'
import { Button } from '@/components/ui/button'


/**
 * SnsList コンポーネント - 外部サービスへのリンクボタン群を表示します。
 *
 * @returns SNS のリンクリストを含む JSX
 */
export default function SnsList() {
  return (
    <div className="flex gap-2">
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
    </div>
  )
}
