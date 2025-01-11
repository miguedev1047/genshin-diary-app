import { useGetCharacters } from '@/features/queries/panel/use-characters'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { CharacterSelectorProps } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/character-selector/character-selector.type'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props
  const { data: ITEMS, status } = useGetCharacters()
  const isLoading = status !== 'success'

  return (
    <DialogMultiSelect
      items={ITEMS as never}
      disabledKeys={[]}
      placeholder='Buscar personaje'
      isLoading={isLoading}
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
