import { useGetCharacters } from '@/features/queries/use-characters'
import { CharacterSelectorProps } from '@/app/(panel)/editor/character/[id]/teams/_components/character-selector/character-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props

  const { data: ITEMS, status } = useGetCharacters()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

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
