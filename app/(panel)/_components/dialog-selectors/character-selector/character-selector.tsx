import { CharacterSelectorProps } from '@/app/(panel)/_components/dialog-selectors/character-selector/character-selector.type'
import { useGetCharacters } from '@/features/queries/use-characters'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props
  const { data: CHARACTERS, status } = useGetCharacters()

  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      items={CHARACTERS as never}
      placeholder='Buscar personaje'
      onValueChange={onChange}
      defaultValue={value}
      maxCount={4}
    />
  )
}
