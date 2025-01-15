import { DialogMultiSelect } from '@/app/(panel)/_components/dialog-multi-select'
import { MaterialSelectorProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-selector/material-selector.type'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { useGetCharacter } from '@/features/providers/character-provider'
import { useGetTalents } from '@/features/queries/use-talents'

export function TalentSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props
  const { data: CHARACTER } = useGetCharacter()

  const { data: ITEMS, status } = useGetTalents()
  if (status === 'pending') return <SpinLoaderInput />
    if (status === 'error') return <SpinLoaderInput />

  const DISABLE_KEYS = CHARACTER?.talents.map((talent) => talent.id)

  return (
    <DialogMultiSelect
      items={ITEMS}
      disabledKeys={DISABLE_KEYS}
      placeholder='Buscar talento'
      onValueChange={onChange}
      defaultValue={value}
    />
  )
}
