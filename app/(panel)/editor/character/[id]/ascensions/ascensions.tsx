'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { AscensionForm } from '@/app/(panel)/editor/character/[id]/ascensions/_components/ascension-form'
import { ascensionColumns } from '@/app/(panel)/editor/character/[id]/ascensions/_components/ascension-table/ascension.columns'
import { Prisma } from '@prisma/client'
import { DataTable } from '@/components/data-table'
import { useGetCharacter } from '@/features/providers/character-provider'

export type Ascension = Prisma.AscensionCharacterGetPayload<{
  include: { materials: true }
}>

export function Ascension() {
  const { data: CHARACTER } = useGetCharacter()
  const ASCENSIONS = CHARACTER?.ascensions as Array<Ascension>

  return (
    <div className='col-span-2'>
      <EditorCard
        title='Materiales de ascension'
        renderForm={<AscensionForm />}
      >
        <DataTable
          columns={ascensionColumns}
          data={ASCENSIONS}
        />
      </EditorCard>
    </div>
  )
}
