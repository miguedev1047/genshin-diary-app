import { useGetMaterials } from '@/features/queries/panel/use-materiales'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-selector/material-selector.type'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'

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
