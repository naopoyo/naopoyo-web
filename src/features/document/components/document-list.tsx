import { Noto_Color_Emoji } from 'next/font/google'
import Link from 'next/link'

import { getDocuments } from '@/features/document'
import { createDateFormat, timeAgo } from '@/utils'

const notoColorEmoji = Noto_Color_Emoji({ subsets: ['emoji'], weight: ['400'] })

export default async function DocumentList() {
  const { documents } = await getDocuments({})
  const df = createDateFormat('yyyy-MM-dd')

  return (
    <div className='p-8 grid grid-cols-3 gap-8'>
      {documents.map((document) => (
        <Link
          key={document.id}
          href='/'
          className='p-8 rounded-xl bg-cyan-950 flex flex-col gap-4 hover:transform hover:duration-500 hover:scale-105'
        >
          <div className='text-center text-7xl'>
            <span className={notoColorEmoji.className}>{document.emoji}</span>
          </div>
          <div className='flex-auto text-lg font-extralight'>{document.title}</div>
          <div className='text-center text-gray-300 text-xs'>
            {timeAgo(document.publishedAt)} - {df(document.publishedAt)}
          </div>
          {document.tags.length > 0 && (
            <ul className='flex flex-row justify-end gap-2'>
              {document.tags.map((tag) => (
                <li key={tag.id} className='px-2 py-1 text-xs rounded bg-cyan-900'>
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
        </Link>
      ))}
    </div>
  )
}
