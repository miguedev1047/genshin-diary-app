import { WeaponSelectorProps } from '@/app/(panel)/_components/dialog-selectors/weapon-selector/weapon-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { useParams } from 'next/navigation'
import { useGetData } from '@/features/providers/data-provider'

export function WeaponSelector(props: WeaponSelectorProps) {
  const { value, onChange } = props
  const { id: CHARACTER_ID } = useParams<{ id: string }>()

  const { data } = useGetData()
  const { characters, weapons } = data

  const CHARACTER = characters && characters.find((i) => i.id === CHARACTER_ID)
  const WEAPONS = weapons && weapons.filter((i) => i.type === CHARACTER?.weapon)

  return (
    <DialogMultiSelect
      items={WEAPONS || []}
      placeholder='Buscar arma'
      onValueChange={onChange}
      defaultValue={value}
      maxCount={5}
    />
  )
}
