import { NavBar } from '@/components/nav-bar'
import { DocumentList } from '@/features/document'

export default function Home() {
  return (
    <>
      <NavBar />
      <section className='p-8'>
        <DocumentList />
      </section>
    </>
  )
}
