import Image from 'next/image'

import naopoyo2 from '@/public/naopoyo2.png'

/**
 * Avatar の Props
 *
 * size - 表示サイズ ('xs' | 'sm' | 'base' | 'lg')
 */
export type AvaterProps = {
  size: 'xs' | 'sm' | 'base' | 'lg'
}

const sizeMap = {
  xs: 64,
  sm: 128,
  base: 192,
  lg: 256,
}

/**
 * Avatar コンポーネント - ユーザーのプロフィール画像を表示します
 *
 * @param props - AvaterProps
 * @returns ユーザーのアバターを表す JSX
 */
export default function Avater(props: AvaterProps) {
  const size = sizeMap[props.size]

  return (
    <Image
      src={naopoyo2}
      width={size}
      height={size}
      alt="Avater"
      className={`rounded-full border object-cover`}
    />
  )
}
