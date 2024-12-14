import { useGetWeapons } from '@/features/queries/panel/use-weapons'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { WeaponSelectorProps } from '@/editor/character/[name]/weapons/_components/weapon-selector/weapon-selector.type'
import { useGetCharacter } from '@/editor/character/[name]/provider'

export function WeaponSelector(props: WeaponSelectorProps) {
  const { data: CHARACTER } = useGetCharacter()
  const { value, onChange } = props

  const { data, status } = useGetWeapons()
  const isLoading = status !== 'success'

  const ITEMS = data?.filter((weapon) => weapon.type === CHARACTER?.weapon)
  const DISABLED_KEYS = CHARACTER?.weapons.map((weapon) => weapon.weapon_id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLED_KEYS}
      placeholder='Buscar arma'
      isLoading={isLoading}
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
