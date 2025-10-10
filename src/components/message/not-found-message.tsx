import { PropsWithChildren } from 'react'

export default function NotFoundMessage({ children }: PropsWithChildren) {
  return <p className="text-center text-muted-foreground">{children}</p>
}
