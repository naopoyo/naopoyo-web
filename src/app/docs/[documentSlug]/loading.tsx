import { Container } from '@/components/layouts/containers'
import { Skeleton } from '@/components/ui/skeleton'


export default function DocumentPageLoading() {
  return (
    <Container className="flex flex-col gap-24 px-4 pt-10">
      <div className="mx-auto flex max-w-full gap-14">
        <div
          className={`
            flex w-full flex-col gap-14
            md:w-[768px]
          `}
        >
          <Skeleton className="h-85 rounded-md" />
          <main>
            <Skeleton className="h-200 rounded-md" />
          </main>
        </div>
        <aside
          className={`
            hidden w-[300px]
            md:inline-block
          `}
        >
          <h2 className="mb-2 font-bold text-muted-foreground">目次</h2>
          <div className="sticky top-[64px]">
            <Skeleton className="h-80 rounded-md" />
          </div>
        </aside>
      </div>
    </Container>
  )
}
