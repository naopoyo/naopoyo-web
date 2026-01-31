import { Metadata } from 'next'

import { Container, PageHeader } from '@/components/layouts'
import { RemPxConverter } from '@/tools/rem-px-converter'


const title = 'rem / px 変換'

export const metadata: Metadata = {
  title: title,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function RemPxConverterPage() {
  return (
    <Container className="flex flex-col items-center gap-16 pt-16">
      <PageHeader title={title} />
      <RemPxConverter />
    </Container>
  )
}
