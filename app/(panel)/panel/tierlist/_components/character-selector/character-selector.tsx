import { useGetCharacters } from '@/features/queries/panel/use-characters'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { CharacterSelectorProps } from '@/app/(panel)/panel/tierlist/_components/character-selector/character-selector.type'


export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, data, onChange } = props

  const { data: ITEMS } = useGetCharacters()
  const DISABLED_KEYS = data.map((item) => item.character_id)

  return (
    <DialogMultiSelect
      items={ITEMS as never}
      disabledKeys={DISABLED_KEYS}
      placeholder='Buscar personaje'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
