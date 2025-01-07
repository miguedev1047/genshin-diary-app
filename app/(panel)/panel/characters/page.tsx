import { Suspense } from 'react'
import { CharacterSkeleton } from '@/app/(panel)/panel/characters/_components/character-skeleton'
import { CharacterRoutes } from '@/app/(panel)/panel/characters/_components/character-routes'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { PageProps } from '@/app/(panel)/panel/characters/_types'
import { HeaderWrapper } from '@/components/header-wrapper'
import { CharacterHeader } from '@/components/headers/character-header'


export default function PanelCharactersPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const KEY = PARAMS.name + PARAMS.element + PARAMS.weapon + PARAMS.stars

  return (
    <ContentLayout title='Personajes'>
      <HeaderWrapper>
        <CharacterHeader isCreator />
      </HeaderWrapper>

      <Suspense
        key={KEY}
        fallback={<CharacterSkeleton />}
      >
        <CharacterRoutes params={PARAMS} />
      </Suspense>
    </ContentLayout>
  )
}
