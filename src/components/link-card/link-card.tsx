import Image from 'next/image'

export interface LinkCardProps {
  url: string
  title: string
  description: string
  domain: string
  imageUrl?: string
  imageHeight?: number
  imageWidth?: number
}

export default function LinkCard(props: LinkCardProps) {
  const faviconUrl = `http://www.google.com/s2/favicons?domain=${props.domain}`

  return (
    <a
      href={props.url}
      className="my-4 flex flex-col-reverse overflow-hidden rounded-lg border !no-underline hover:bg-primary/5 md:h-36 md:flex-row"
    >
      <div className="flex flex-auto flex-col overflow-hidden p-4">
        <div className="line-clamp-2 flex-auto text-primary">{props.title}</div>
        <div className="mb-2 line-clamp-2 text-xs text-muted-foreground">{props.description}</div>
        <div className="flex items-center gap-2">
          <picture className="rounded-full dark:bg-foreground">
            <img src={faviconUrl} alt={`${props.domain} favicon`} width={16} height={16} />
          </picture>
          <div className="line-clamp-1 text-nowrap text-sm text-muted-foreground">
            {props.domain}
          </div>
        </div>
      </div>
      {props.imageUrl && (
        <div className="md:max-w-[50%]">
          <Image
            alt={props.title}
            src={props.imageUrl}
            height={props.imageHeight}
            width={props.imageWidth}
            className="aspect-auto max-h-72 max-w-full object-contain md:max-h-36 md:max-w-min"
          />
        </div>
      )}
    </a>
  )
}
