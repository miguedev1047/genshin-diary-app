import { AscensionsProps } from '@/app/(panel)/editor/character/[name]/ascensions/ascensions.type'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { AscensionTable } from '@/app/(panel)/editor/character/[name]/ascensions/_components/ascension-table'
import { AscensionForm } from '@/app/(panel)/editor/character/[name]/ascensions/_components/ascension-form'
import { columns } from '@/app/(panel)/editor/character/[name]/ascensions/_components/ascension-table/ascension-columns'
import { Prisma } from '@prisma/client'

export type Ascension = Prisma.AscensionCharacterGetPayload<{
  include: { materials: true }
}>

export function Ascension(props: AscensionsProps) {
  const { data: CHARACTER } = props
  const ASCENSIONS = CHARACTER?.ascensions as Array<Ascension>

  return (
    <EditorCard
      title='Materiales de ascension'
      renderForm={<AscensionForm data={CHARACTER} />}
    >
      <AscensionTable
        columns={columns}
        data={ASCENSIONS}
      />
    </EditorCard>
  )
}
