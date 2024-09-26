import { useGetCharacters } from '@/features/queries/use-characters'
import { DialogMultiSelect } from '@/shared/components/dialog-multi-select'
import { CharacterSelectorProps } from '@/app/(panel)/editor/weapon/[name]/best-characters/_components/character-selector/character-selector.type'
import { useGetWeapon } from '@/app/(panel)/editor/weapon/[name]/provider'

export function CharacterSelector(props: CharacterSelectorProps) {
  const { value, onChange } = props

  const { data: WEAPON } = useGetWeapon()
  const { data: ITEMS, status } = useGetCharacters()

  const DISABLE_KEYS = WEAPON?.bests_characters.map((c) => c.character_id)
  const FILTERED_ITEMS = ITEMS?.filter((i) => i.weapon === WEAPON?.type)
  
  const isLoading = status !== 'success'

  return (
    <DialogMultiSelect
      items={FILTERED_ITEMS as never}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar personaje'
      isLoading={isLoading}
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
