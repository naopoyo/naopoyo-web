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
  return (
    <a
      href={props.url}
      className="my-4 flex flex-col-reverse rounded-lg border border-gray-500 !no-underline hover:bg-slate-500/10 md:flex-row"
    >
      <div className="flex flex-auto flex-col overflow-hidden px-4 py-2">
        <div className="flex-auto">{props.title}</div>
        <div className="mb-2 text-xs text-gray-600">{props.description}</div>
        <div className="text-nowrap text-gray-500">{props.domain}</div>
      </div>
      {props.imageUrl && (
        <div>
          <Image
            alt={props.title}
            src={props.imageUrl}
            height={props.imageHeight}
            width={props.imageWidth}
            className="aspect-auto max-w-full rounded-lg object-cover md:max-h-80 md:max-w-80"
          />
        </div>
      )}
    </a>
  )
}
