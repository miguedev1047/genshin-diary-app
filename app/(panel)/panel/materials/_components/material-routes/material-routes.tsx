import { GRID_LIST } from '@/consts/classes'
import { MaterialRoutesProps } from '@/app/(panel)/panel/materials/_components/material-routes/material-routes.type'
import { getMaterials } from '@/app/(panel)/panel/materials/_services/fetch'
import { MaterialItem } from '@/app/(panel)/panel/materials/_components/material-item'
import { getMaterialTypeText } from '@/features/utils/character-texts'

export async function MaterialRoutes(props: MaterialRoutesProps) {
  const { params: PARAMS } = props
  const MATERIALS = await getMaterials(PARAMS)

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
        <ul className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5'>
          {MAPPED_MATERIALS}
        </ul>
      </li>
    )
  })

  return <ul className='w-full space-y-6'>{MAPPED_CATEGORIES}</ul>
}
