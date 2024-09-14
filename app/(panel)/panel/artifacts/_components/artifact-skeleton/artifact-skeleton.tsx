import { GRID_LIST } from '@/consts/classes'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ArtifactSkeleton() {
  return (
    <ul className={GRID_LIST}>
      {Array.from({ length: 12 }).map((_, index) => (
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
