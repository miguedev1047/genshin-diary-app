import BlurFade from '@/components/magicui/blur-fade'
import { PageProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/_types'
import { getWeapon } from '@/app/(index)/(dynamic-routes)/weapon/[id]/_services/fetch'
import { PAGE_NAME } from '@/consts/misc'
import { redirect } from 'next/navigation'
import { WeaponInfo } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info'
import { WeaponAscension } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-ascension'
import { BestCharacter } from '@/app/(index)/(dynamic-routes)/weapon/[id]//best-characters'
import { AlertError } from '@/app/(index)/(dynamic-routes)/weapon/[id]/alert-error'
import { ScrollToTop } from '@/components/scroll-to-top'

export async function generateMetadata(props: PageProps) {
  const { params } = props

  const WEAPON_ID = params.id
  const WEAPON = await getWeapon(WEAPON_ID)

  const IS_PUBLIC = WEAPON?.is_public
  if (!WEAPON || !IS_PUBLIC) return { title: `${PAGE_NAME} - Indefinido` }

  return {
    title: `${PAGE_NAME} - ${WEAPON.name}`,
    description: `Arma ${WEAPON.name}`,
  }
}

export default async function WeaponPage(props: PageProps) {
  const { params } = props

  const WEAPON_ID = params.id
  const WEAPON = await getWeapon(WEAPON_ID)

  const IS_PUBLIC = WEAPON?.is_public
  if (!WEAPON || !IS_PUBLIC) return redirect('/')

  return (
    <BlurFade delay={0.2}>
      <section className='space-y-8 md:space-y-16 gap-2 md:gap-x-4 grid grid-cols-2 relative pb-24'>
        <ScrollToTop />
        <WeaponInfo data={WEAPON} />
        <BestCharacter data={WEAPON} />
        <WeaponAscension data={WEAPON} />
        <AlertError />
      </section>
    </BlurFade>
  )
}
