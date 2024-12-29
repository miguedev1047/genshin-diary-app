'use client'

import { useGetWeapon } from '@/app/(panel)/editor/weapon/[id]/provider'
import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { columns } from '@/app/(panel)/editor/weapon/[id]/ascensions/_components/weapon-ascension-table/ascension-table-columns'
import { WeaponAscensionTable } from '@/app/(panel)/editor/weapon/[id]/ascensions/_components/weapon-ascension-table'
import { WeaponAscensionsProps } from '@/app/(panel)/editor/weapon/[id]/ascensions/ascensions.type'
import { WeaponAscensionForm } from '@/app/(panel)/editor/weapon/[id]/ascensions/_components/weapon-ascension-form'

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
