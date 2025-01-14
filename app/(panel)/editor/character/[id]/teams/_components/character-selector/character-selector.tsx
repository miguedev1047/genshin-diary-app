import { useGetCharacters } from '@/features/queries/panel/use-characters'
import { CharacterSelectorProps } from '@/app/(panel)/editor/character/[id]/teams/_components/character-selector/character-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props
  const { data: ITEMS } = useGetCharacters()

  return (
    <DialogMultiSelect
      defaultValue={value}
      items={ITEMS as never}
      placeholder='Buscar personaje'
      onValueChange={onChange}
      maxCount={4}
    />
  )
}
