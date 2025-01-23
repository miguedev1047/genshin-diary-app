import { useGetWeapons } from '@/features/queries/use-weapons'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { WeaponSelectorProps } from '@/app/(panel)/editor/character/[id]/weapons/_components/weapon-selector/weapon-selector.type'
import { useGetCharacter } from '@/features/providers/character-provider'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function WeaponSelector(props: WeaponSelectorProps) {
  const { value, onChange } = props
  const { data: CHARACTER } = useGetCharacter()

  const { data: WEAPON, status } = useGetWeapons()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  const ITEMS = WEAPON?.filter((weapon) => weapon.type === CHARACTER?.weapon)
  const DISABLED_KEYS = CHARACTER?.weapons.map((weapon) => weapon.weapon_id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLED_KEYS}
      placeholder='Buscar arma'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
