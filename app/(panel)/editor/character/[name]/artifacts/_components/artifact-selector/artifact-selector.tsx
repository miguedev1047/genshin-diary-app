import { useGetArtifacts } from '@/features/queries/panel/use-artifacts'
import { ArtifactSelectorProps } from './artifact-selector.type'
import { DialogMultiSelect } from '@/shared/components/dialog-multi-select'
import { useGetCharacter } from '../../../provider'

export function ArtifactSelector(props: ArtifactSelectorProps) {
  const { data: CHARACTER } = useGetCharacter()
  const { value, onChange } = props

  const { data: ITEMS, status } = useGetArtifacts()
  const isLoading = status !== 'success'

  const DISABLE_KEYS = CHARACTER?.artifacts.map((item) => item.artifact_id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar artefactos'
      isLoading={isLoading}
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
