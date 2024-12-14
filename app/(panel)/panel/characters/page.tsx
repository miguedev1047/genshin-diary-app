import { Suspense } from 'react'
import { CharacterSkeleton } from '@/app/(panel)/panel/characters/_components/character-skeleton'
import { CharacterRoutes } from '@/app/(panel)/panel/characters/_components/character-routes'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { FilterContainer } from '@/components/filter-container'
import { CharacterFilter } from '@/app/(panel)/_components/filters/character-filter'
import { PageProps } from '@/app/(index)/(home)/_types'

export default function PanelCharactersPage(props: PageProps) {
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
