import { GRID_LIST } from '@/consts/classes'
import { MaterialRoutesProps } from '@/app/(panel)/panel/materials/_components/material-routes/material-routes.type'
import { getMaterials } from '@/app/(panel)/panel/materials/_services/fecth'
import { MaterialItem } from '@/app/(panel)/panel/materials/_components/material-item'

export async function MaterialRoutes(props: MaterialRoutesProps) {
  const { params: PARAMS } = props
  const MATERIALS = await getMaterials(PARAMS)

  return (
    <ul className={GRID_LIST}>
      {MATERIALS?.map((item) => (
        <li key={item.id} className='relative'>
          <MaterialItem {...item} />
        </li>
      ))}
    </ul>
  )
}
