import Image from 'next/image'

/**
 * Avatar の Props
 *
 * size - 表示サイズ ('xs' | 'sm' | 'base' | 'lg')
 */
export type AvatarProps = {
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
 * @param props - AvatarProps
 * @returns ユーザーのアバターを表す JSX
 */
export default function Avatar(props: AvatarProps) {
  const size = sizeMap[props.size]

  return (
    <picture>
      <Image
        src={'/naopoyo2.png'}
        width={size}
        height={size}
        alt="Avatar"
        className={`rounded-full border object-cover`}
      />
    </picture>
  )
}
