import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { GRID_LIST } from '@/consts/classes'

export function MaterialSkeleton() {
  return (
    <ul className={GRID_LIST}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card
          key={index}
          className='aspect-[1/1]'
        >
          <Skeleton className='w-full h-full' />
        </Card>
      ))}
    </ul>
  )
}
