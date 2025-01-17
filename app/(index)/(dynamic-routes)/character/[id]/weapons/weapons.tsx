import { ViewCard } from '@/app/(index)/_components/view-card'
import { WeaponsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons/weapons.type'
import { WeaponItem } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons/_components/weapon-item'
import { Title } from '@/components/ui/title'

export function Weapons(props: WeaponsProps) {
  const { data } = props
  const WEAPONS = data.weapons ?? []

  if (!WEAPONS.length) {
    return (
      <ViewCard title='Mejores armas'>
        <Title className='text-center py-20 text-2xl opacity-70 font-extrabold uppercase'>
          No hay elementos para mostrar
        </Title>
      </ViewCard>
    )
  }

  const MAPPED_WEAPONS = WEAPONS.map((weapon) => (
    <li key={weapon.id}>
      <WeaponItem {...weapon} />
    </li>
  ))

  return (
    <div className='col-span-1'>
      <ViewCard title='Mejores armas' helper>
        <ul className='grid gap-4'>{MAPPED_WEAPONS}</ul>
      </ViewCard>
    </div>
  )
}
