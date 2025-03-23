'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { useGetCharacter } from '@/features/providers/character-provider'
import { StatsPriorityForm } from '@/app/(panel)/editor/character/[id]/stats-priority/_components/stats-priority-form'
import { Card, CardContent } from '@/components/ui/card'
import { getStatPriorityText } from '@/features/utils/character-texts'
import { Title } from '@/components/ui/title'
import { Crown, Hourglass, Wine } from 'lucide-react'

export function StatsPriority() {
  const { data: CHARACTER } = useGetCharacter()
  const STATS = CHARACTER?.stats_priority

  const SANDS = getStatPriorityText('sands', STATS?.sand_stat)
  const GLOBET = getStatPriorityText('globet', STATS?.globet_stat)
  const CIRCLET = getStatPriorityText('circlet', STATS?.circlet_stat)

  return (
    <div className='col-span-2'>
      <EditorCard
        title='Mejores estadisticas'
        renderForm={<StatsPriorityForm />}
      >
        {!STATS && (
          <h2 className='text-2xl font-bold uppercase py-20 opacity-70 mx-auto text-center'>
            No hay estadisticas para mostrar
          </h2>
        )}

        {STATS && (
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
                  <span className='font-extrabold'>{STATS.order_priority}</span>
                </Title>
              </CardContent>
            </Card>
          </article>
        )}
      </EditorCard>
    </div>
  )
}
