import { Heading } from '@/components/typography/headings'
import { cn } from '@/lib/shadcn-utils'

export type SectionProps = {
  heading?: string
  children?: React.ReactNode
  className?: string
}

export default function Section({ heading, children, className }: SectionProps) {
  return (
    <section className={cn(`flex flex-col gap-8`, className)}>
      {heading && <Heading className="text-center">{heading}</Heading>}
      {children}
    </section>
  )
}
