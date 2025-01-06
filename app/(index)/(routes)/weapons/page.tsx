import { HeaderWrapper } from '@/components/header-wrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GRID_LIST } from '@/consts/classes'
import { PageProps } from '@/app/(index)/(routes)/weapons/_types'
import { WeaponHeader } from '@/components/headers/weapon-header'
import { getWeapons } from '@/app/(index)/(routes)/weapons/_services/fetch'
import { redirect } from 'next/navigation'
import { WeaponItem } from '@/app/(index)/(routes)/weapons/_components/weapon-item'
import { BorderBeam } from '@/components/magicui/border-beam'

export default async function WeaponPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const WEAPONS = await getWeapons(PARAMS)

  if (!WEAPONS) return redirect('/')

  const MAPPED_WEAPONS = WEAPONS.map((weapon) => (
    <li key={weapon.id}>
      <WeaponItem {...weapon} />
    </li>
  ))

  return (
    <section className='relative'>
      <Card className='relative overflow-clip'>
        <CardHeader>
          <HeaderWrapper>
            <WeaponHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent>
          <ul className={GRID_LIST}>{MAPPED_WEAPONS}</ul>
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
