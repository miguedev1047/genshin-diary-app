import { WeaponSelectorProps } from '@/app/(panel)/_components/dialog-selectors/weapon-selector/weapon-selector.type'
import { useGetWeapons } from '@/features/queries/use-weapons'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { useGetCharacter } from '@/features/providers/character-provider'

export function WeaponSelector(props: WeaponSelectorProps) {
  const { value, onChange } = props
  const { data, status } = useGetWeapons()
  const { data: CHARACTER } = useGetCharacter()

  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  const WEAPONS = data?.filter((i) => i.type === CHARACTER?.weapon) ?? []

  return (
    <DialogMultiSelect
      items={WEAPONS}
      placeholder='Buscar arma'
      onValueChange={onChange}
      defaultValue={value}
      maxCount={5}
    />
  )
}
