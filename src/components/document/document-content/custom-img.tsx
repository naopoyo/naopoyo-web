import Image from 'next/image'
import { ExtraProps } from 'react-markdown'

export default function CustomImg({
  children,
  src,
  width,
  height,
  alt,
}: JSX.IntrinsicElements['img'] & ExtraProps) {
  if (src && width && height && alt) {
    return <Image src={src} width={Number(width)} height={Number(height)} alt={alt} />
  }

  return <>{children}</>
}
