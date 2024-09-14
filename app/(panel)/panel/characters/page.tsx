import { GRID_LIST } from '@/consts/classes'
import { ElementEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { getCharacters } from '@/app/(panel)/panel/characters/_services/fetch'
import { CharacterItem } from '@/app/(panel)/panel/characters/_components/character-item'
import { CharacterFilter } from '@/shared/filters/character-filter'
import { FilterContainer } from '@/shared/components/filter-container'

type Props = {
  searchParams: {
    name: string
    element: ElementEnum
    weapon: WeaponTypeEnum
    stars: RarityEnum | any
  }
}

export default async function PanelCharactersPage(props: Props) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = await getCharacters(PARAMS)

  const ITEMS = CHARACTERS?.map((item) => (
    <li key={item.id}>
      <CharacterItem {...item} />
    </li>
  ))

  return (
    <ContentLayout
      title='Personajes'
      className='space-y-6'
    >
      <FilterContainer>
        <CharacterFilter />
      </FilterContainer>

      <ul className={GRID_LIST}>{ITEMS}</ul>
    </ContentLayout>
  )
}
