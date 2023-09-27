import Link from 'next/link'

import { getTags } from '@/features/tag'

export default async function TagList() {
  const { tags } = await getTags()

  return (
    <div className='grid grid-cols-6 gap-8'>
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href='/'
          className='p-4 rounded-xl bg-cyan-950/50 flex flex-col gap-4 hover:transform hover:duration-500 hover:scale-105'
        >
          <div className='flex flex-row gap-2'>
            <div className='flex-auto'>{tag.name}</div>
            <div className='text-gray-400'>{tag.documentCount}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
