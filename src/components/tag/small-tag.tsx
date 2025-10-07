import NextLink from 'next/link'

import ColorCircle from './color-circle'

export type SmallTagProps = {
  tagName: string
}

export default function SmallTag({ tagName }: SmallTagProps) {
  return (
    <NextLink
      href={`/tags/${tagName}`}
      className={`
        flex items-center gap-2 rounded-lg border bg-muted px-3 py-1 text-sm
        hover:bg-muted/50
      `}
    >
      <div className="size-2">
        <ColorCircle value={tagName} />
      </div>
      <div>{tagName}</div>
    </NextLink>
  )
}
