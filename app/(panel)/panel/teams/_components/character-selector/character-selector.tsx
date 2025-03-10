import { useGetCharacters } from '@/features/queries/use-characters'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { CharacterSelectorProps } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/character-selector/character-selector.type'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props
  
  const { data: ITEMS, status } = useGetCharacters()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      items={ITEMS as never}
      disabledKeys={[]}
      maxCount={4}
      placeholder='Buscar personaje'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
