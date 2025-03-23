import { MaterialSelectorProps } from '@/app/(panel)/editor/weapon/[id]/ascensions/_components/material-selector/material-selector.type'
import { useGetMaterials } from '@/features/queries/use-materiales'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props
  
  const { data: ITEMS, status } = useGetMaterials()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      items={ITEMS}
      placeholder='Buscar material'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
