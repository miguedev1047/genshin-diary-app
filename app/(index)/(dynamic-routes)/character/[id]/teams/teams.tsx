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

  const MAPPED_TABS = TEAMS.map((team) => (
    <TabsTrigger
      value={`tab-${team.id}`}
      key={team.id}
      className='relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary'
    >
      <Title>{team.name}</Title>
    </TabsTrigger>
  ))

  const MAPPED_CONTENT = TEAMS.map((team) => (
    <TabsContent
      value={`tab-${team.id}`}
      key={team.id}
    >
      <TeamItem {...team} />
    </TabsContent>
  ))

  return (
    <div className='col-span-2'>
      <ViewCard title='Mejores equipos'>
        <ul className='grid gap-4'>
          <Tabs defaultValue={`tab-${DEFAULT_TEAM?.id}`}>
            <TabsList className='h-auto rounded-none border-b border-border bg-transparent p-0'>
              {MAPPED_TABS}
            </TabsList>
            {MAPPED_CONTENT}
          </Tabs>
        </ul>
      </ViewCard>
    </div>
  )
}
