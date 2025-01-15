import { ViewCard } from '@/app/(index)/_components/view-card'
import { WeaponAscensionProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-ascension/weapon-ascension.type'
import { DataTable } from '@/components/data-table'
import { ascensionColumns } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-ascension/_components/ascension-table'

export function WeaponAscension(props: WeaponAscensionProps) {
  const { data: WEAPON } = props
  const WEAPON_ASCENSION = WEAPON.ascensions ?? []

  return (
    <ViewCard title='Ascensión'>
      <DataTable
        data={WEAPON_ASCENSION}
        columns={ascensionColumns}
      />
    </ViewCard>
  )
}
