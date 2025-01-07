import { ViewCard } from '@/app/(index)/_components/view-card'
import { StatsPriorityProps } from '@/app/(index)/(dynamic-routes)/character/[id]/stats-priority/stats-priority.type'
import { StatePriorityCard } from '@/app/(index)/(dynamic-routes)/character/[id]/stats-priority/_components/stats-priority-card/stats-priority-card'
import { Title } from '@/components/ui/title'

export function StatsPriority(props: StatsPriorityProps) {
  const { data } = props
  const STATS = data?.stats_priority

  if (!STATS)
    return (
      <div className='col-span-2'>
        <ViewCard title='Mejores estadisticas'>
          <Title className='text-center py-20 text-2xl opacity-70 font-extrabold uppercase'>
            No hay elementos para mostrar
          </Title>
        </ViewCard>
      </div>
    )

  return (
    <div className='col-span-2'>
      <StatePriorityCard {...STATS} />
    </div>
  )
}
