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
      className="my-4 flex flex-col-reverse overflow-hidden rounded-lg border border-gray-500 !no-underline hover:bg-slate-500/10 md:h-36 md:flex-row"
    >
      <div className="flex flex-auto flex-col overflow-hidden px-4 py-2">
        <div className="flex-auto text-white">{props.title}</div>
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
            className="aspect-auto max-w-full object-contain md:max-h-36 md:max-w-min"
          />
        </div>
      )}
    </a>
  )
}
