import { DocumentList } from '@/features/document'

export default function TagDetail({ params: { tagName } }: { params: { tagName: string } }) {
  const decodedTagName = decodeURI(tagName)
  return (
    <>
      <h1 className='py-16 text-4xl text-center font-bold'>{decodedTagName}</h1>
      <section className='p-8'>
        <DocumentList filter={{ tags: [decodedTagName], draft: false }} />
      </section>
    </>
  )
}
