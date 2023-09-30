import { TagList } from '@/features/tag'

export default function Tags() {
  return (
    <>
      <h1 className='py-16 text-4xl text-center font-bold'>Tags</h1>
      <section className='p-8'>
        <TagList />
      </section>
    </>
  )
}
