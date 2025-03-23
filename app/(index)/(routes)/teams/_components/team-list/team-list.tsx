import { EmptyList } from '@/components/empty-list'
import { TeamListProps } from '@/app/(index)/(routes)/teams/_components/team-list/team-list.type'
import { TeamItem } from '@/app/(index)/(routes)/teams/_components/team-item'

export function TeamList(props: TeamListProps) {
  const { data: TEAMS } = props

  if (!TEAMS || !TEAMS.length) {
    return <EmptyList text='No hay equipos disponibles' />
  }

  const MAPPED_TEAMS = TEAMS?.map((team) => (
    <li key={team.id}>
      <TeamItem {...team} />
    </li>
  ))

  return <ul className='grid md:grid-cols-2 gap-4'>{MAPPED_TEAMS}</ul>
}
