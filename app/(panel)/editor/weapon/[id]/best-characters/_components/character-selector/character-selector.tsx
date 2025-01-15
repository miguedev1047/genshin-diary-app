import { useGetCharacters } from '@/features/queries/use-characters'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { useGetWeapon } from '@/features/providers/weapon-provider'
import { CharacterSelectorProps } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/character-selector/character-selector.type'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props
  const { data: WEAPON } = useGetWeapon()

  const { data: ITEMS, status } = useGetCharacters()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  const DISABLE_KEYS = WEAPON?.bests_characters.map((c) => c.character_id)
  const FILTERED_ITEMS = ITEMS?.filter((i) => i.weapon === WEAPON?.type)

  return (
    <DialogMultiSelect
      items={FILTERED_ITEMS as never}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar personaje'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
