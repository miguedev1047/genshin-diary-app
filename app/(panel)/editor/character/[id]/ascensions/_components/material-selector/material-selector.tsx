import { useGetMaterials } from '@/features/queries/panel/use-materiales'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-selector/material-selector.type'

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
