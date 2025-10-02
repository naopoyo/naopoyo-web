import { cn } from '@/lib/shadcn-utils'

export type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        `
          container mx-auto px-4
          md:px-0
        `,
        className
      )}
    >
      {children}
    </div>
  )
}
