'use client'

import { useGetWeapon } from '@/editor/weapon/[name]/provider'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { AscensionTable } from '@/editor/weapon/[name]/ascensions/_components/ascension-table'
import { ASCENSION_TABLE_COLUMNS } from '@/editor/weapon/[name]/ascensions/_components/ascension-table/ascension-table.columns'
import { WeaponAscensionsProps } from '@/editor/weapon/[name]/ascensions/ascensions.type'
import { AsensionForm } from '@/editor/weapon/[name]/ascensions/_components/ascension-form'

export function Ascensions() {
  const { data: WEAPON } = useGetWeapon()
  const ASCENSIONS = WEAPON?.ascensions as Array<WeaponAscensionsProps>

  return (
    <EditorCard
      title='Materiales de ascensión'
      renderForm={<AsensionForm />}
    >
      <AscensionTable
        data={ASCENSIONS}
        columns={ASCENSION_TABLE_COLUMNS}
      />
    </EditorCard>
  )
}
