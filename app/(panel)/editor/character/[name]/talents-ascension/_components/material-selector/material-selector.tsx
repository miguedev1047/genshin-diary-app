import { useGetMaterials } from '@/features/queries/panel/use-materiales'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/editor/character/[name]/ascensions/_components/material-selector/material-selector.type'
import { useGetCharacter } from '@/editor/character/[name]/provider'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { data: CHARACTER } = useGetCharacter()
  const { value, onChange } = props

  const { data: ITEMS, status } = useGetMaterials()
  const isLoading = status !== 'success'

  const DISABLE_KEYS = CHARACTER?.talents.map((talent) => talent.id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar material'
      isLoading={isLoading}
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
