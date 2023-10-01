import { DocumentList } from '@/features/document'

export default function Home() {
  return (
    <section className='p-8'>
      <DocumentList filter={{ draft: false }} />
    </section>
  )
}
