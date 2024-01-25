import Image from 'next/image'

export interface AvaterProps {
  size: 'sm' | 'base' | 'lg'
}

const sizeMap = {
  sm: 64,
  base: 128,
  lg: 256,
}

export default function Avater(props: AvaterProps) {
  const size = sizeMap[props.size]

  return (
    <Image
      src="/naopoyo2.png"
      width={size}
      height={size}
      alt="Avater"
      className="rounded-full border object-cover"
    />
  )
}
