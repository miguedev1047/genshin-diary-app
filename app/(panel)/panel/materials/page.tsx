import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { FilterContainer } from '@/shared/components/filter-container'
import { MaterialFilter } from '@/shared/filters/material-filter'
import { getMaterials } from './_services/fecth'
import { GRID_LIST } from '@/consts/classes'
import { MaterialItem } from './_components/material-item'

type Props = {
  searchParams: {
    name: string
  }
}

export default async function PanelMaterialsPage(props: Props) {
  const { searchParams: PARAMS } = props
  const MATERIALS = await getMaterials(PARAMS)

  const ITEMS = MATERIALS?.map((item) => (
    <li key={item.id}>
      <MaterialItem {...item} />
    </li>
  ))

  return (
    <ContentLayout title='Materiales' className='space-y-6'>
      <FilterContainer>
        <MaterialFilter />
      </FilterContainer>

      <ul className={GRID_LIST}>{ITEMS}</ul>
    </ContentLayout>
  )
}
