'use client'

import { useGetWeapon } from '@/features/providers/weapon-provider'
import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { ascensionWeaponColumns } from '@/app/(panel)/editor/weapon/[id]/ascensions/_components/weapon-ascension-table/ascension-table.columns'
import { WeaponAscensionsProps } from '@/app/(panel)/editor/weapon/[id]/ascensions/ascensions.type'
import { DataTable } from '@/components/data-table'
import { WeaponAscensionForm } from '@/app/(panel)/editor/weapon/[id]/ascensions/_components/weapon-ascension-form'

export function Ascensions() {
  const { data: WEAPON } = useGetWeapon()
  const ASCENSIONS = WEAPON?.ascensions as Array<WeaponAscensionsProps>

  return (
    <EditorCard
      title='Materiales de ascensión'
      renderForm={<WeaponAscensionForm />}
    >
      <DataTable
        data={ASCENSIONS}
        columns={ascensionWeaponColumns}
      />
    </EditorCard>
  )
}
