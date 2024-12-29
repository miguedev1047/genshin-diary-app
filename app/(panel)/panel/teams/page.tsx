import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { Card, CardContent } from '@/components/ui/card'
import { TeamList } from '@/app/(panel)/panel/teams/_components/team-list'
import { getTeams } from '@/app/(panel)/panel/teams/_services/fetch'
import { PageProps, Teams } from '@/app/(panel)/panel/teams/_types'
import { HeaderWrapper } from '@/components/header-wrapper'
import { TeamHeader } from '@/app/(panel)/_components/headers/team-header'

export default async function PanelTeamsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const TEAMS = (await getTeams(PARAMS)) as Teams

  return (
    <ContentLayout title='Equipos'>
      <HeaderWrapper>
        <TeamHeader />
      </HeaderWrapper>
      
      <Card>
        <CardContent className='p-6'>
          <TeamList data={TEAMS} />
        </CardContent>
      </Card>
    </ContentLayout>
  )
}
