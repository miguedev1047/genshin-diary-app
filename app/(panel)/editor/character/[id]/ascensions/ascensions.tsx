'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { AscensionTable } from '@/app/(panel)/editor/character/[id]/ascensions/_components/ascension-table'
import { AscensionForm } from '@/app/(panel)/editor/character/[id]/ascensions/_components/ascension-form'
import { columns } from '@/app/(panel)/editor/character/[id]/ascensions/_components/ascension-table/ascension-columns'
import { Prisma } from '@prisma/client'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'

export type Ascension = Prisma.AscensionCharacterGetPayload<{
  include: { materials: true }
}>

export function Ascension() {
  const { data: CHARACTER } = useGetCharacter()
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
