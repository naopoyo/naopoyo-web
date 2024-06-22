import Image from 'next/image'
import { ExtraProps } from 'react-markdown'

import ImageViewer from './image-viewer'

export default function CustomImg({
  children,
  src,
  width,
  height,
  alt,
}: JSX.IntrinsicElements['img'] & ExtraProps) {
  if (src && width && height && alt) {
    return (
      <ImageViewer>
        <Image src={src} width={Number(width)} height={Number(height)} alt={alt} />
      </ImageViewer>
    )
  }

  return <>{children}</>
}
