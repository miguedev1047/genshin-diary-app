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
      <article className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        <Card>
          <CardContent className='p-5'>
            <Title className='flex items-center justify-between gap-2'>
              <article>
                <span>Reloj: </span>
                <span className='font-extrabold'>{SANDS}</span>
              </article>
              <Hourglass />
            </Title>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-5'>
            <Title className='flex items-center justify-between gap-2'>
              <article>
                <span>Copa: </span>
                <span className='font-extrabold'>{GLOBET}</span>
              </article>
              <Wine />
            </Title>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-5'>
            <Title className='flex items-center justify-between gap-2'>
              <article>
                <span>Corona: </span>
                <span className='font-extrabold'>{CIRCLET}</span>
              </article>
              <Crown />
            </Title>
          </CardContent>
        </Card>

        <Card className='col-span-1 lg:col-span-3'>
          <CardContent className='p-5 text-center'>
            <Title>
              Estadisticas secundarias:{' '}
              <span className='font-extrabold'>{order_priority}</span>
            </Title>
          </CardContent>
        </Card>
      </article>
    </ViewCard>
  )
}
