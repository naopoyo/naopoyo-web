import { PropsWithChildren } from 'react'

export interface PageHeaderProps extends PropsWithChildren {}

export default function PageHeader({ children }: PageHeaderProps) {
  return <h1 className="py-16 text-center text-4xl font-bold">{children}</h1>
}
