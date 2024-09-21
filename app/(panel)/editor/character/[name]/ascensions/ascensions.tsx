import { AscensionsProps } from '@/app/(panel)/editor/character/[name]/ascensions/ascensions.type'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { AscensionTable } from './_components/ascension-table'
import { columns } from './_components/ascension-table/ascension-columns'
import { AscensionCharacter } from '@prisma/client'

export function Ascension(props: AscensionsProps) {
  const { data: CHARACTER } = props
  const ASCENSIONS = CHARACTER?.ascensions as Array<AscensionCharacter>

  return (
    <EditorCard title='Materiales de ascension'>
      <AscensionTable
        columns={columns}
        data={ASCENSIONS}
      />
    </EditorCard>
  )
}
