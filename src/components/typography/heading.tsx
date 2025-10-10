import { PropsWithChildren } from 'react'

export default function Heading({ children }: PropsWithChildren) {
  return <h2 className="my-4 text-center text-xl font-bold">{children}</h2>
}
