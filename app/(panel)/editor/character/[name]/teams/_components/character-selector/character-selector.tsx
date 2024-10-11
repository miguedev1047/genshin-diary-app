import { useGetCharacters } from '@/features/queries/panel/use-characters'
import { CharacterSelectorProps } from '@/app/(panel)/editor/weapon/[name]/best-characters/_components/character-selector/character-selector.type'
import { DialogMultiSelect } from '@/shared/components/dialog-multi-select'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props

  const { data: ITEMS, status } = useGetCharacters()
  const isLoading = status !== 'success'

  return (
    <DialogMultiSelect
      items={ITEMS as never}
      placeholder='Buscar personaje'
      isLoading={isLoading}
      maxCount={4}
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
