import { PropsWithChildren } from 'react'

export default function MutedMessage({ children }: PropsWithChildren) {
  return <p className="text-center text-muted-foreground">{children}</p>
}
