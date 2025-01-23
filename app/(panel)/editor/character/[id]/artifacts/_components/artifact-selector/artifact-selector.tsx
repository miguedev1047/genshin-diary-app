import { useGetArtifacts } from '@/features/queries/use-artifacts'
import { ArtifactSelectorProps } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-selector/artifact-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function ArtifactSelector(props: ArtifactSelectorProps) {
  const { value, onChange } = props

  const { data: ITEMS, status } = useGetArtifacts()
  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={[]}
      maxCount={4}
      placeholder='Buscar artefactos'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
