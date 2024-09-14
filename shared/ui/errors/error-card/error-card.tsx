import { Card } from '@/components/ui/card'
import { GRID_LIST } from '@/consts/classes'
import { CircleAlert } from 'lucide-react'

export function ErrorCard() {
  return (
    <ul className={GRID_LIST}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card
          className='relative aspect-[2/3] border-destructive text-destructive grid place-content-center'
          key={index}
        >
          <CircleAlert className='size-8 md:size-16 lg:size-24 animate-pulse' />
        </Card>
      ))}
    </ul>
  )
}
