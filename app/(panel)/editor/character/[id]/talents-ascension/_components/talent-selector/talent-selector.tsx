import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-selector/material-selector.type'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { useGetTalents } from '@/features/queries/panel/use-talents'

export function TalentSelector(props: MaterialSelectorProps) {
  const { data: CHARACTER } = useGetCharacter()
  const { data: ITEMS } = useGetTalents()

  const { value, onChange } = props

  const DISABLE_KEYS = CHARACTER?.talents.map((talent) => talent.id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar talento'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
