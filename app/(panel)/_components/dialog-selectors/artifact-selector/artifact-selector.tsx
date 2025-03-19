import { ArtifactSelectorProps } from '@/app/(panel)/_components/dialog-selectors/artifact-selector/artifact-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { useGetData } from '@/features/providers/data-provider'

export function ArtifactSelector(props: ArtifactSelectorProps) {
  const { value, onChange } = props

  const { data } = useGetData()
  const { artifacts } = data

  return (
    <DialogMultiSelect
      items={artifacts || []}
      placeholder='Buscar artefacto'
      onValueChange={onChange}
      defaultValue={value}
      maxCount={5}
    />
  )
}
