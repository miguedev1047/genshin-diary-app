import { MaterialRoutesProps } from '@/app/(panel)/panel/materials/_components/material-routes/material-routes.type'
import { getMaterials } from '@/app/(panel)/panel/materials/_services/fetch'
import { MaterialItem } from '@/app/(panel)/panel/materials/_components/material-item'
import { getMaterialTypeText } from '@/features/utils/character-texts'
import { EmptyList } from '@/components/empty-list'
import { EMPTY_LIST } from '@/consts/misc'
import { ITEMS_GRID_LIST } from '@/consts/classes'

export async function MaterialRoutes(props: MaterialRoutesProps) {
  const { params: PARAMS } = props
  const MATERIALS = await getMaterials(PARAMS)

  if (!MATERIALS || MATERIALS.length === EMPTY_LIST) {
     return <EmptyList text='No hay materiales disponibles' />
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
        <ul className={ITEMS_GRID_LIST}>
          {MAPPED_MATERIALS}
        </ul>
      </li>
    )
  })

  return <ul className='w-full space-y-6'>{MAPPED_CATEGORIES}</ul>
}
