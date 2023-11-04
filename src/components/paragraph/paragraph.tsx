import { PropsWithChildren } from 'react'

export interface ParagraphProps extends PropsWithChildren {}

export default function Paragraph({ children }: ParagraphProps) {
  return <p className="leading-8">{children}</p>
}
