import { EmptyList } from '@/components/empty-list'
import { MaterialListProps } from '@/app/(index)/(routes)/materials/_components/material-list/material-list.type'
import { MaterialItem } from '@/app/(index)/(routes)/materials/_components/material-item'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ITEMS_GRID_LIST } from '@/consts/classes'
import { getMaterialTypeText } from '@/features/utils/character-texts'

export function MaterialList(props: MaterialListProps) {
  const { data: MATERIALS } = props

  if (!MATERIALS || !MATERIALS.length) {
    return <EmptyList text='No hay materials disponibles' />
  }

  const MAPPED_CATEGORIES = MATERIALS?.map(({ category, materials }) => {
    const CATEGORY_NAME = getMaterialTypeText(category)

    const MAPPED_MATERIALS = materials.map((material) => (
      <li
        key={material.id}
        className='relative'
      >
        <MaterialItem {...material} />
      </li>
    ))

    return (
      <li
        key={category}
        className='space-y-4'
      >
        <h2 className='uppercase font-extrabold text-xl'>{CATEGORY_NAME}</h2>
        <ul className={ITEMS_GRID_LIST}>{MAPPED_MATERIALS}</ul>
      </li>
    )
  })

  return (
    <TooltipProvider>
      <ul className='w-full space-y-6'>{MAPPED_CATEGORIES}</ul>
    </TooltipProvider>
  )
}
