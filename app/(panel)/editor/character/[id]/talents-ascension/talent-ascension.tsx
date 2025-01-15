'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { useGetCharacter } from '@/features/providers/character-provider'
import { TalentAscensionProps } from '@/app/(panel)/editor/character/[id]/talents-ascension/talent-ascension.type'
import { TalentAscensionForm } from '@/app/(panel)/editor/character/[id]/talents-ascension/_components/talent-ascension-form'
import { talentAscensionColumns } from '@/app/(panel)/editor/character/[id]/talents-ascension/_components/talent-ascension-table/talent-ascension.columns'
import { DataTable } from '@/components/data-table'

export function TalentAscension() {
  const { data: CHARACTER } = useGetCharacter()
  const TALENTS = CHARACTER?.talents_ascension as Array<TalentAscensionProps>

  return (
    <EditorCard
      title='Mejora de talentos'
      renderForm={<TalentAscensionForm />}
    >
      <DataTable
        columns={talentAscensionColumns}
        data={TALENTS}
      />
    </EditorCard>
  )
}
