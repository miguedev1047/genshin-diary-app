import { MaterialSelectorProps } from '@/app/(panel)/_components/dialog-selectors/material-selector/material-selector.type'
import { useGetMaterials } from '@/features/queries/use-materiales'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props
  const { data: MATERIALS, status } = useGetMaterials()

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
