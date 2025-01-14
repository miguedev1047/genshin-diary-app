import { useGetMaterials } from '@/features/queries/panel/use-materiales'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-selector/material-selector.type'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props

  const { data: CHARACTER } = useGetCharacter()
  const { data: ITEMS } = useGetMaterials()

  const DISABLE_KEYS = CHARACTER?.materials.map((material) => material.id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar material'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
