import { GRID_LIST } from '@/consts/classes'
import { WeaponRoutesProps } from '@/app/(panel)/panel/weapons/_components/weapon-routes/weapon-routes.type'
import { getWeapons } from '@/app/(panel)/panel/weapons/_services/fetch'
import { WeaponItem } from '@/app/(panel)/panel/weapons/_components/weapon-item'

export async function WeaponRoutes(props: WeaponRoutesProps) {
  const { params: PARAMS } = props
  const WEAPONS = await getWeapons(PARAMS)

  return (
    <ul className={GRID_LIST}>
      {WEAPONS?.map((item) => (
        <li key={item.id}>
          <WeaponItem {...item} />
        </li>
      ))}
    </ul>
  )
}
