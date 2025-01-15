import { useGetArtifacts } from '@/features/queries/use-artifacts'
import { ArtifactSelectorProps } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-selector/artifact-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { useGetCharacter } from '@/features/providers/character-provider'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function ArtifactSelector(props: ArtifactSelectorProps) {
  const { value, onChange } = props
  const { data: CHARACTER } = useGetCharacter()

  const { data: ITEMS, status } = useGetArtifacts()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

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
