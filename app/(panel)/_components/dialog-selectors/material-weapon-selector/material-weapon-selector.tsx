import { MaterialWeaponSelectorProps } from '@/app/(panel)/_components/dialog-selectors/material-weapon-selector/material-weapon-selector.type'
import { useGetWeaponMaterials } from '@/features/queries/use-materiales'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'

export function MaterialWeaponSelector(props: MaterialWeaponSelectorProps) {
  const { value, onChange } = props
  const { data: MATERIALS, status } = useGetWeaponMaterials()

  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      items={MATERIALS}
      placeholder='Buscar material'
      onValueChange={onChange}
      defaultValue={value}
      maxCount={4}
    />
  )
}
