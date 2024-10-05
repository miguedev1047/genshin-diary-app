import { useGetMaterials } from '@/features/queries/panel/use-materiales'
import { DialogMultiSelect } from '@/shared/components/dialog-multi-select'
import { MaterialSelectorProps } from '@/editor/character/[name]/ascensions/_components/material-selector/material-selector.type'

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
