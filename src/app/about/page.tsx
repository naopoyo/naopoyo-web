import { Metadata } from 'next'
import Image from 'next/image'

import Paragraph from '@/components/paragraph/paragraph'

export const metadata: Metadata = {
  title: 'About',
}
export default function Abount() {
  return (
    <>
      <h1 className='py-16 text-4xl text-center font-bold'>About</h1>

      <section className='p-8 flex flex-col items-center gap-4'>
        <Image
          src='/naopoyo2.png'
          width={160}
          height={160}
          alt='logo'
          className='object-cover rounded-full'
        />

        <div className='flex flex-col items-center gap-8'>
          <section className='text-center'>
            <h2 className='text-xl font-bold'>naopoyo</h2>
            <Paragraph>個人でWEBサービスの開発をやっています。</Paragraph>
            <Paragraph>このサイトでは個人開発で学んだことなどを整理して公開しています。</Paragraph>
          </section>

          <section className='text-center'>
            <h2 className='text-xl font-bold'>つくったもの</h2>
            <Paragraph>Hacker Sheet</Paragraph>
          </section>
        </div>
      </section>
    </>
  )
}
