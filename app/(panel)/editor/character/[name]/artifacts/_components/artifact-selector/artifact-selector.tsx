import { useGetArtifacts } from '@/features/queries/panel/use-artifacts'
import { ArtifactSelectorProps } from '@/app/(panel)/editor/character/[name]/artifacts/_components/artifact-selector/artifact-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { useGetCharacter } from '@/editor/character/[name]/provider'

export function ArtifactSelector(props: ArtifactSelectorProps) {
  const { data: CHARACTER } = useGetCharacter()
  const { value, onChange } = props

  const { data: ITEMS } = useGetArtifacts()
  const DISABLE_KEYS = CHARACTER?.artifacts.map((item) => item.artifact_id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar artefactos'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
