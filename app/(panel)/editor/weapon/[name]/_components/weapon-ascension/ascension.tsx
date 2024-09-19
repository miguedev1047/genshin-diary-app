import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { AscensionTable } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-ascension/ascension-table'
import { Prisma } from '@prisma/client'
import { columns } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-ascension/ascension-table/columns'
import { AscensionForm } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-ascension/ascension-form'

type Ascension = Prisma.WeaponAscensionsGetPayload<{
  include: { materials: true }
}>

export function Ascension() {
  const { data: WEAPON } = useGetWeaponByName()
  const ASCENSIONS = WEAPON?.ascensions as Array<Ascension>

  return (
    <EditorCard
      title='Materiales de ascensión'
      renderForm={<AscensionForm />}
    >
      <AscensionTable
        columns={columns}
        data={ASCENSIONS}
      />
    </EditorCard>
  )
}
