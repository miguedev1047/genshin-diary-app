import { ViewCard } from '@/app/(index)/_components/view-card'
import { WeaponsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons/weapons.type'
import { WeaponItem } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons/_components/weapon-item'
import { cn } from '@/lib/utils'

export function Weapons(props: WeaponsProps) {
  const { data } = props
  const WEAPONS = data.weapons ?? []

  const MAPPED_WEAPONS = WEAPONS.map((weapon) => (
    <li key={weapon.id} className={cn()}>
      <WeaponItem {...weapon} />
    </li>
  ))

  return (
    <div className='col-span-1'>
      <ViewCard title='Mejores armas'>
        <ul className='grid gap-4'>{MAPPED_WEAPONS}</ul>
      </ViewCard>
    </div>
  )
}
