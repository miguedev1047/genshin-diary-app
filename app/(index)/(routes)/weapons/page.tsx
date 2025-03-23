import { HeaderWrapper } from '@/components/header-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PageProps } from '@/app/(index)/(routes)/weapons/_types'
import { WeaponHeader } from '@/components/headers/weapon-header'
import { getWeapons } from '@/app/(index)/(routes)/weapons/_services/fetch'
import { redirect } from 'next/navigation'
import { BorderBeam } from '@/components/magicui/border-beam'
import { WeaponRoutes } from '@/app/(index)/(routes)/weapons/_components/weapon-routes'

export default async function WeaponPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const WEAPONS = await getWeapons(PARAMS)
  if (!WEAPONS) return redirect('/weapons')

  return (
    <section className='relative'>
      <Card className='max-md:overflow-visible overflow-hidden max-md:border-0 max-md:border-none'>
        <CardHeader className='space-y-4 max-md:p-0'>
          <HeaderWrapper>
            <WeaponHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent className='max-md:p-0'>
          <WeaponRoutes data={WEAPONS ?? []} />
        </CardContent>
        <BorderBeam className='max-md:hidden' />
      </Card>
    </section>
  )
}
