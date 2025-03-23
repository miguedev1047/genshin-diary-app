import { HeaderWrapper } from '@/components/header-wrapper'
import { TeamHeader } from '@/components/headers/team-header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PageProps } from '@/app/(index)/(routes)/teams/_types'
import { getTeams } from '@/app/(index)/(routes)/teams/_services/fetch'
import { redirect } from 'next/navigation'
import { BorderBeam } from '@/components/magicui/border-beam'
import { TeamList } from '@/app/(index)/(routes)/teams/_components/team-list'

export default async function TeamPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const TEAMS = await getTeams(PARAMS)
  if (!TEAMS) return redirect('/')

  return (
    <section className='relative pb-24'>
      <Card className='max-md:overflow-visible overflow-hidden max-md:border-0 max-md:border-none'>
        <CardHeader className='space-y-4 max-md:p-0'>
          <HeaderWrapper>
            <TeamHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent className='max-md:p-0'>
          <TeamList data={TEAMS ?? []} />
        </CardContent>
        <BorderBeam className='max-md:hidden' />
      </Card>
    </section>
  )
}
