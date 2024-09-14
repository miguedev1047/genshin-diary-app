import { GRID_LIST } from '@/consts/classes'
import { FilterContainer } from '@/shared/components/filter-container'
import { WeaponFilter } from '@/shared/filters/weapon-filter'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { RarityEnum, WeaponTypeEnum } from '@prisma/client'
import { getWeapons } from '@/app/(panel)/panel/weapons/_services/fetch'
import { WeaponItem } from '@/app/(panel)/panel/weapons/_components/weapon-item'

type Props = {
  searchParams: {
    name: string
    weapon: WeaponTypeEnum
    stars: RarityEnum | any
  }
}

export default async function PanelWeaponsPage(props: Props) {
  const { searchParams: PARAMS } = props
  const WEAPONS = await getWeapons(PARAMS)

  const ITEMS = WEAPONS?.map((item) => (
    <li key={item.id}>
      <WeaponItem {...item} />
    </li>
  ))

  return (
    <ContentLayout
      title='Armas'
      className='space-y-6'
    >
      <FilterContainer>
        <WeaponFilter />
      </FilterContainer>

      <ul className={GRID_LIST}>{ITEMS}</ul>
    </ContentLayout>
  )
}
