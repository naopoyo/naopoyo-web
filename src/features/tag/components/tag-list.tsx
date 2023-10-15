import Link from 'next/link'

import { TagList } from '@/features/tag/types'

export interface TagListProps {
  tags: TagList
}

export default async function TagList({ tags }: TagListProps) {
  return (
    <div className='grid md:grid-cols-6 grid-cols-2 gap-8'>
      {tags.map(
        (tag) =>
          tag.documentCountInPublished > 0 && (
            <Link
              key={tag.id}
              href={`/tags/${tag.name}`}
              className='p-4 rounded-xl bg-app-bg3/50 flex flex-col gap-4 hover:transform hover:duration-500 hover:scale-110'
            >
              <div className='flex flex-row gap-2'>
                <div className='flex-auto'>{tag.name}</div>
                <div className='text-gray-400'>{tag.documentCountInPublished}</div>
              </div>
            </Link>
          )
      )}
    </div>
  )
}
