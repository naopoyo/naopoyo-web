import Image from 'next/image'

export interface AvaterProps {
  size: 'xs' | 'sm' | 'base' | 'lg'
}

const sizeMap = {
  xs: 64,
  sm: 128,
  base: 192,
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
