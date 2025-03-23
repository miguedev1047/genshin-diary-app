import { MaterialSelectorProps } from '@/app/(panel)/_components/dialog-selectors/material-selector/material-selector.type'
import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { useGetTalents } from '@/features/queries/use-talents'

export function TalentSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props
  const { data: TALENTS, status } = useGetTalents()

  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      items={TALENTS}
      placeholder='Buscar talento'
      onValueChange={onChange}
      defaultValue={value}
      maxCount={4}
    />
  )
}
