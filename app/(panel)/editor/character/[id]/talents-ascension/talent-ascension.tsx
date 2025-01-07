'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { TalentAscensionProps } from '@/app/(panel)/editor/character/[id]/talents-ascension/talent-ascension.type'
import { TalentAscensionForm } from '@/app/(panel)/editor/character/[id]/talents-ascension/_components/talent-ascension-form'
import { columns } from '@/app/(panel)/editor/character/[id]/talents-ascension/_components/talent-ascension-table/talent-ascension-columns'
import { DataTable } from '@/components/data-tabla'

export function TalentAscension() {
  const { data: CHARACTER } = useGetCharacter()
  const TALENTS = CHARACTER?.talents_ascension as Array<TalentAscensionProps>

  return (
    <EditorCard
      title='Mejora de talentos'
      renderForm={<TalentAscensionForm />}
    >
      <DataTable
        columns={columns}
        data={TALENTS}
      />
    </EditorCard>
  )
}
