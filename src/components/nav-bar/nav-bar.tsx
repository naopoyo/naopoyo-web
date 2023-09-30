import Link from 'next/link'

export default function NabBar() {
  return (
    <nav className='h-[64px] sticky top-0 z-10 px-8 bg-app-bg/50 backdrop-blur-xl flex flex-row justify-center'>
      <div className='flex flex-auto items-center gap-4'>
        <div className='font-bold text-2xl'>
          <Link href='/'>naopoyo</Link>
        </div>
        <ul className='flex-auto flex flex-row gap-6 items-center justify-end'>
          <li className='text-sm'>
            <Link href='/tags'>Tags</Link>
          </li>
          <li className='text-sm'>
            <Link href='/about'>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
