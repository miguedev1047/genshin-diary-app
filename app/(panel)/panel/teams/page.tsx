import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { TeamList } from '@/app/(panel)/panel/teams/_components/team-list'
import { getTeams } from '@/app/(panel)/panel/teams/_services/fetch'
import { PageProps, Teams } from '@/app/(panel)/panel/teams/_types'
import { HeaderWrapper } from '@/components/header-wrapper'
import { TeamHeader } from '@/components/headers/team-header'

export default async function PanelTeamsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const TEAMS = (await getTeams(PARAMS)) as Teams

  return (
    <ContentLayout title='Equipos'>
      <HeaderWrapper>
        <TeamHeader isCreator />
      </HeaderWrapper>

      <TeamList data={TEAMS} />
    </ContentLayout>
  )
}
