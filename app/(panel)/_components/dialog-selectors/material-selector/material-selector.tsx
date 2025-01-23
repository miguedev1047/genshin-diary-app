import { MaterialSelectorProps } from './material-selector.type'
import { useGetMaterials } from '@/features/queries/use-materiales'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { DialogMultiSelect } from '../../dialog-multi-select'

export function MaterialSelector(props: MaterialSelectorProps) {
  const { value, onChange } = props
  const { data, status } = useGetMaterials()

  const MATERIALS = data?.map((item) => ({
    name: item.name,
    id: item.id,
    image_url: item.image_url,
  }))

  if (status === 'pending') return <SpinLoaderInput />
  if (status === 'error') return <SpinLoaderInput />

  return (
    <DialogMultiSelect
      defaultValue={value}
      onValueChange={onChange}
      placeholder='Selecciona un material'
      items={MATERIALS}
      maxCount={4}
    />
  )
}
