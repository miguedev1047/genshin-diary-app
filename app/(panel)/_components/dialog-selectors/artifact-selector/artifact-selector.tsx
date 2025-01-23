import { ArtifactSelectorProps } from '@/app/(panel)/_components/dialog-selectors/artifact-selector/artifact-selector.type'
import { useGetArtifacts } from '@/features/queries/use-artifacts'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function ArtifactSelector(props: ArtifactSelectorProps) {
  const { value, onChange } = props
  const { data: ARTIFACTS, status } = useGetArtifacts()

  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      items={ARTIFACTS}
      placeholder='Buscar artefacto'
      onValueChange={onChange}
      defaultValue={value}
      maxCount={5}
    />
  )
}
