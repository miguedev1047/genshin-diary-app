import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { GRID_LIST } from '@/consts/classes'

export function CharacterSkeleton() {
  return (
    <ul className={GRID_LIST}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card
          className='aspect-[2/3] animate-pulse'
          key={index}
        >
          <Skeleton className='w-full h-full' />
        </Card>
      ))}
    </ul>
  )
}
