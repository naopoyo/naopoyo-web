import { cn } from '@/lib/shadcn-utils'

/**
 * Container の Props
 */
export type ContainerProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Container コンポーネント - レイアウトの横幅を制御するラッパーです。
 *
 * @param props - ContainerProps
 * @returns コンテナ要素の JSX
 */
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
