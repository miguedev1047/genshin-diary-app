import { useGetMaterials } from '@/app/(panel)/editor/character/[name]/_shared/queries/use-materiales'
import { DialogMultiSelect } from '@/shared/components/dialog-multi-select'
import { MaterialSelectorProps } from '@/app/(panel)/editor/character/[name]/ascensions/_components/material-selector/material-selector.type'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props

  const { data: ITEMS, status } = useGetMaterials()
  const isLoading = status !== 'success'

  return (
    <DialogMultiSelect
      items={ITEMS}
      placeholder='Buscar material'
      isLoading={isLoading}
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
