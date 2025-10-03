import NextLink from 'next/link'

export type SmallTagProps = {
  tagName: string
}

export default function SmallTag({ tagName }: SmallTagProps) {
  return (
    <NextLink
      href={`/tags/${tagName}`}
      className={`
        block rounded-lg border bg-muted px-3 py-1 text-sm
        hover:bg-muted/50
      `}
    >
      {tagName}
    </NextLink>
  )
}
