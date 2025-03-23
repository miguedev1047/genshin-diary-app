import { StatsPriorityCardProps } from '@/app/(index)/(dynamic-routes)/character/[id]/stats-priority/_components/stats-priority-card/stats-priority-card.type'
import { ViewCard } from '@/app/(index)/_components/view-card'
import { Card, CardContent } from '@/components/ui/card'
import { Title } from '@/components/ui/title'
import { getStatPriorityText } from '@/features/utils/character-texts'
import { Crown, Hourglass, Wine } from 'lucide-react'

export function StatePriorityCard(props: StatsPriorityCardProps) {
  const { circlet_stat, globet_stat, sand_stat, order_priority } = props

  const SANDS = getStatPriorityText('sands', sand_stat)
  const GLOBET = getStatPriorityText('globet', globet_stat)
  const CIRCLET = getStatPriorityText('circlet', circlet_stat)

  return (
    <ViewCard title='Mejores estadisticas'>
      <article className='grid grid-cols-1 lg:grid-cols-3 gap-3 md:p-5 '>
        <Card>
          <CardContent className='p-3 md:p-5'>
            <Title className='flex items-center justify-between gap-2'>
              <article className='text-sm md:text-base'>
                <span>Reloj: </span>
                <span className='font-extrabold'>{SANDS}</span>
              </article>
              <Hourglass />
            </Title>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-3 md:p-5'>
            <Title className='flex items-center justify-between gap-2'>
              <article className='text-sm md:text-base'>
                <span>Copa: </span>
                <span className='font-extrabold'>{GLOBET}</span>
              </article>
              <Wine />
            </Title>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-3 md:p-5'>
            <Title className='flex items-center justify-between gap-2'>
              <article className='text-sm md:text-base'>
                <span>Corona: </span>
                <span className='font-extrabold'>{CIRCLET}</span>
              </article>
              <Crown />
            </Title>
          </CardContent>
        </Card>

        <Card className='col-span-1 lg:col-span-3'>
          <CardContent className='p-3 md:p-5 text-start'>
            <Title>
              <article className='text-sm md:text-base'>
                <span>Orden de prioridad: </span>
                <span className='font-extrabold'>{order_priority}</span>
              </article>
            </Title>
          </CardContent>
        </Card>
      </article>
    </ViewCard>
  )
}
