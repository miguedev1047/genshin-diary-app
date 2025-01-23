import BlurFade from '@/components/magicui/blur-fade'
import { PageProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/_types'
import { getWeapon } from '@/app/(index)/(dynamic-routes)/weapon/[id]/_services/fetch'
import { PAGE_NAME } from '@/consts/misc'
import { redirect } from 'next/navigation'
import { WeaponInfo } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info'
import { WeaponAscension } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-ascension'
import { BestCharacter } from '@/app/(index)/(dynamic-routes)/weapon/[id]//best-characters'
import { AlertError } from './alert-error'
import { ScrollToTop } from '@/components/scroll-to-top'

export async function generateMetadata(props: PageProps) {
  const { params } = props

  const WEAPON_ID = params.id
  const WEAPON = await getWeapon(WEAPON_ID)

  if (!WEAPON) return { title: `${PAGE_NAME} - Indefinido` }

  return {
    title: `${PAGE_NAME} - ${WEAPON.name}`,
    description: `Arma ${WEAPON.name}`,
  }
}

export default async function WeaponPage(props: PageProps) {
  const { params } = props

  const WEAPON_ID = params.id
  const WEAPON = await getWeapon(WEAPON_ID)

  if (!WEAPON) return redirect('/')

  return (
    <BlurFade delay={0.2}>
      <section className='space-y-16 gap-x-4 grid grid-cols-2 relative'>
        <ScrollToTop />
        <WeaponInfo data={WEAPON} />
        <BestCharacter data={WEAPON} />
        <WeaponAscension data={WEAPON} />
        <AlertError />
      </section>
    </BlurFade>
  )
}
