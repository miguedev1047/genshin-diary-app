import { useGetMaterials } from '@/features/queries/panel/use-materiales'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/editor/character/[name]/ascensions/_components/material-selector/material-selector.type'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props
  const { data: ITEMS } = useGetMaterials()

  return (
    <DialogMultiSelect
      items={ITEMS}
      placeholder='Buscar material'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
