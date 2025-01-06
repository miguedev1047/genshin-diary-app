import BlurFade from '@/components/magicui/blur-fade'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { PageProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/_types'
import { getWeapon } from '@/app/(index)/(dynamic-routes)/weapon/[id]/_services/fetch'
import { PAGE_NAME } from '@/consts/misc'
import { redirect } from 'next/navigation'
import { WeaponInfo } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info'
import { WeaponAscension } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-ascension'
import { BestCharacter } from '@/app/(index)/(dynamic-routes)/weapon/[id]//best-characters'

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
      <TracingBeam className='px-6 max-w-full'>
        <section className='space-y-16'>
          <WeaponInfo data={WEAPON} />
          <BestCharacter data={WEAPON} />
          <WeaponAscension data={WEAPON} />
        </section>
      </TracingBeam>
    </BlurFade>
  )
}
