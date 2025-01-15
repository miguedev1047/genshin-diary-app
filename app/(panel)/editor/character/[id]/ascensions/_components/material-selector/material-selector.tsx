import { useGetMaterials } from '@/features/queries/use-materiales'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-selector/material-selector.type'
import { useGetCharacter } from '@/features/providers/character-provider'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props
  const { data: CHARACTER } = useGetCharacter()

  const { data: ITEMS, status } = useGetMaterials()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

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
