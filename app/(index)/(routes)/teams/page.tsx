import { HeaderWrapper } from '@/components/header-wrapper'
import { TeamHeader } from '@/components/headers/team-header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PageProps } from './_types'
import { getTeams } from './_services/fetch'
import { TeamItem } from './_components/team-item'
import { redirect } from 'next/navigation'
import { BorderBeam } from '@/components/magicui/border-beam'

export default async function TeamPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const TEAMS = await getTeams(PARAMS)

  if (!TEAMS) return redirect('/')

  const MAPPED_TEAMS = TEAMS.map((team) => (
    <li key={team.id}>
      <TeamItem {...team} />
    </li>
  ))

  return (
    <section className='relative'>
      <Card className='relative overflow-hidden'>
        <CardHeader>
          <HeaderWrapper>
            <TeamHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent>
          <ul className='grid md:grid-cols-2 gap-4'>{MAPPED_TEAMS}</ul>
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
