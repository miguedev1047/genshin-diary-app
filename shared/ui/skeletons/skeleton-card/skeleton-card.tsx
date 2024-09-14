import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { GRID_LIST } from '@/consts/classes'

export function SkeletonCard() {
  return (
    <ul className={GRID_LIST}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card
          className='aspect-[2/3]'
          key={index}
        >
          <Skeleton className='w-full h-full' />
        </Card>
      ))}
    </ul>
  )
}
