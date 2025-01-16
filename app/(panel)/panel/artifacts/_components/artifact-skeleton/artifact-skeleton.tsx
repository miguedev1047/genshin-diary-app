import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ArtifactSkeleton() {
  return (
    <ul className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5'>
      {Array.from({ length: 20 }).map((_, index) => (
        <Card
          key={index}
          className='aspect-[1/1]'
        >
          <Skeleton className='h-full w-full' />
        </Card>
      ))}
    </ul>
  )
}
