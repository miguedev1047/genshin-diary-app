import { FilterContainer } from '@/components/filter-container'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { Card, CardContent } from '@/components/ui/card'
import { TeamList } from '@/app/(panel)/panel/teams/_components/team-list'
import { getTeams } from '@/app/(panel)/panel/teams/_services/fetch'
import { TeamFilter } from '@/app/(panel)/_components/filters/team-filter'
import { PageProps, Teams } from '@/app/(panel)/panel/teams/_types'

export default async function PanelTeamsPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const TEAMS = (await getTeams(PARAMS)) as Teams

  return (
    <ContentLayout title='Equipos'>
      <FilterContainer>
        <TeamFilter />
      </FilterContainer>
      
      <Card>
        <CardContent className='p-6'>
          <TeamList data={TEAMS} />
        </CardContent>
      </Card>
    </ContentLayout>
  )
}
