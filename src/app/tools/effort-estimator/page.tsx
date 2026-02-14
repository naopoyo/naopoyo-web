import { Metadata } from 'next'

import { Container } from '@/components/layouts/containers'
import { PageHeader } from '@/components/layouts/page-headers'
import { EffortEstimator } from '@/tools/effort-estimator'

const title = '工数見積もりくん'

export const metadata: Metadata = {
  title: title,
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function EffortEstimatorPage() {
  return (
    <Container className="flex flex-col items-center gap-16 pt-16">
      <PageHeader title={title} />
      <EffortEstimator />
    </Container>
  )
}
