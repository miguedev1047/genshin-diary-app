import { WeaponRoutesProps } from '@/app/(panel)/panel/weapons/_components/weapon-routes/weapon-routes.type'
import { getWeapons } from '@/app/(panel)/panel/weapons/_services/fetch'
import { WeaponItem } from '@/app/(panel)/panel/weapons/_components/weapon-item'
import { EmptyList } from '@/components/empty-list'
import { EMPTY_LIST } from '@/consts/misc'
import { ITEMS_GRID_LIST } from '@/consts/classes'

export async function WeaponRoutes(props: WeaponRoutesProps) {
  const { params: PARAMS } = props
  const WEAPONS = await getWeapons(PARAMS)

  if (!WEAPONS || WEAPONS.length === EMPTY_LIST) {
    return <EmptyList text='No hay armas disponibles' />
  }

  const MAPPED_WEAPONS = WEAPONS?.map((item) => (
    <li
      key={item.id}
      className='relative'
    >
      <WeaponItem {...item} />
    </li>
  ))

  return <ul className={ITEMS_GRID_LIST}>{MAPPED_WEAPONS}</ul>
}
