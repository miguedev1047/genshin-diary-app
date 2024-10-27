import { Suspense } from 'react'
import { ElementEnum, RarityEnum, WeaponTypeEnum } from '@prisma/client'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { CharacterFilter } from '@/shared/filters/character-filter'
import { FilterContainer } from '@/shared/components/filter-container'
import { CharacterSkeleton } from '@/app/(panel)/panel/characters/_components/character-skeleton'
import { CharacterRoutes } from '@/app/(panel)/panel/characters/_components/character-routes'

type Props = {
  searchParams: {
    name: string
    element: ElementEnum
    weapon: WeaponTypeEnum
    stars: RarityEnum
  }
}

export default function PanelCharactersPage(props: Props) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name + PARAMS.element + PARAMS.weapon + PARAMS.stars

  return (
    <ContentLayout title='Personajes'>
      <FilterContainer>
        <CharacterFilter />
      </FilterContainer>

      <Suspense
        key={KEY}
        fallback={<CharacterSkeleton />}
      >
        <CharacterRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
