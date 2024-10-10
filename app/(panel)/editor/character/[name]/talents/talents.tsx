'use client'

import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { TalentsForm } from '@/editor/character/[name]/talents/_components/talents-form'
import { TalentTable } from '@/editor/character/[name]/talents/_components/talents-table'
import { columns } from '@/editor/character/[name]/talents/_components/talents-table/talent-columns'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { TalentProps } from '@/editor/character/[name]/talents/talents.type'

export function Talents() {
  const { data: CHARACTER } = useGetCharacter()
  const TALENTS = CHARACTER?.talents as Array<TalentProps>

  return (
    <EditorCard
      title='Mejora de talentos'
      renderForm={<TalentsForm />}
    >
      <TalentTable
        columns={columns}
        data={TALENTS}
      />
    </EditorCard>
  )
}
