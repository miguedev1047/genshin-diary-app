'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { StatsPriorityForm } from '@/app/(panel)/editor/character/[id]/stats-priority/_components/stats-priority-form'
import { Card, CardContent } from '@/components/ui/card'

export function StatsPriority() {
  const { data: CHARACTER } = useGetCharacter()
  const STATS = CHARACTER?.stats_priority

  return (
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
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 text-center'>
          <Card>
            <CardContent className='p-5'>
              <h2 className='text-sm'>
                Reloj: <span className='font-extrabold'>{STATS.sand_stat}</span>
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-5'>
              <h2 className='text-sm'>
                Caliz: <span className='font-extrabold'>{STATS.globet_stat}</span>
              </h2>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-5'>
              <h2 className='text-sm'>
                Caliz: <span className='font-extrabold'>{STATS.circlet_stat}</span>
              </h2>
            </CardContent>
          </Card>

          <Card className='col-span-1 lg:col-span-3'>
            <CardContent className='p-5'>
              <h2 className='text-sm'>
                Prioridad: <span className='font-extrabold'>{STATS.order_priority}</span>
              </h2>
            </CardContent>
          </Card>
        </div>
      )}
    </EditorCard>
  )
}
