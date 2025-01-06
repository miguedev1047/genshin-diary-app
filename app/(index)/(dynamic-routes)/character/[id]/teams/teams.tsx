import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ViewCard } from '@/app/(index)/_components/view-card'
import { TeamsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/teams.types'
import { TeamItem } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/_components/team-item'
import { Title } from '@/components/ui/title'

export function Teams(props: TeamsProps) {
  const { data } = props
  const TEAMS = data.teams ?? []

  const [DEFAULT_TEAM] = TEAMS

  if (!TEAMS?.length) {
    return (
      <div className='col-span-2'>
        <ViewCard title='Mejores equipos'>
          <Title className='text-center py-20 text-2xl opacity-70 font-extrabold uppercase'>
            No hay elementos para mostrar
          </Title>
        </ViewCard>
      </div>
    )
  }

  const MAPPED_CONTENT = TEAMS.map((team) => (
    <li key={team.id}>
      <TeamItem {...team} />
    </li>
  ))

  return (
    <div className='col-span-2'>
      <ViewCard title='Mejores equipos'>
        <ul className='grid md:grid-cols-2 gap-4'>{MAPPED_CONTENT}</ul>
      </ViewCard>
    </div>
  )
}
