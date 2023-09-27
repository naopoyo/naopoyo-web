import Image from 'next/image'

import { NavBar } from '@/components/nav-bar'

export default function Abount() {
  return (
    <>
      <NavBar />

      <h1 className='py-16 text-4xl text-center font-bold'>About</h1>

      <section className='p-8 flex flex-col items-center gap-4'>
        <Image
          src='/naopoyo.png'
          width={160}
          height={160}
          alt='logo'
          className='object-cover rounded-full'
        />

        <div className='flex flex-col items-center gap-8'>
          <section className='text-center'>
            <h2 className='text-xl font-bold'>naopoyo</h2>
            <p>個人でWEBサービスの開発などをやっています。</p>
            <p>このサイトでは個人開発で得た知識を整理して公開しています。</p>
          </section>

          <section className='text-center'>
            <h2 className='text-xl font-bold'>つくったもの</h2>
            <p>Hacker Sheet</p>
          </section>
        </div>
      </section>
    </>
  )
}
