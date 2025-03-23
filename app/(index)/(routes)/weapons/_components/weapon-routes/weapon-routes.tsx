import { EmptyList } from '@/components/empty-list'
import { WeaponItem } from '@/app/(index)/(routes)/weapons/_components/weapon-item'
import { WeaponRoutesProps } from '@/app/(index)/(routes)/weapons/_components/weapon-routes/weapon-routes.type'
import { ITEMS_GRID_LIST } from '@/consts/classes'
import { TooltipProvider } from '@/components/ui/tooltip'

export function WeaponRoutes(props: WeaponRoutesProps) {
  const { data: WEAPONS } = props

  if (!WEAPONS || !WEAPONS.length) {
    return <EmptyList text='No hay armas disponibles' />
  }

  const MAPPED_WEAPONS = WEAPONS.map((weapon) => (
    <li key={weapon.id}>
      <WeaponItem {...weapon} />
    </li>
  ))
  return (
    <TooltipProvider>
      <ul className={ITEMS_GRID_LIST}>{MAPPED_WEAPONS}</ul>
    </TooltipProvider>
  )
}
