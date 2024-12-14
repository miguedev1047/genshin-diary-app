'use client'

import { useGetWeapon } from '@/editor/weapon/[name]/provider'
import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { columns } from '@/app/(panel)/editor/weapon/[name]/ascensions/_components/weapon-ascension-table/ascension-table-columns'
import { WeaponAscensionTable } from '@/app/(panel)/editor/weapon/[name]/ascensions/_components/weapon-ascension-table'
import { WeaponAscensionsProps } from '@/editor/weapon/[name]/ascensions/ascensions.type'
import { WeaponAscensionForm } from '@/app/(panel)/editor/weapon/[name]/ascensions/_components/weapon-ascension-form'

export function Ascensions() {
  const { data: WEAPON } = useGetWeapon()
  const ASCENSIONS = WEAPON?.ascensions as Array<WeaponAscensionsProps>

  return (
    <EditorCard
      title='Materiales de ascensión'
      renderForm={<WeaponAscensionForm />}
    >
      <WeaponAscensionTable
        data={ASCENSIONS}
        columns={columns}
      />
    </EditorCard>
  )
}
