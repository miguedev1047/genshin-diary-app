import { Suspense } from 'react'
import { SpinLoaderContent } from '@/components/spin-loaders'
import { ContentLayout } from '@/app/(index)/_components/content-layout'
import { CharacterProps, PageProps } from '@/app/(index)/(routes)/(home)/_types'
import { getCharacters } from '@/app/(index)/(routes)/(home)/_services/fetch'
import { HomeHero } from '@/app/(index)/(routes)/(home)/_sections/home-hero'
import { HomeCharacters } from '@/app/(index)/(routes)/(home)/_sections/home-characters'

export default async function Home(props: PageProps) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = (await getCharacters(PARAMS)) as Array<CharacterProps>

  return (
    <Suspense fallback={<SpinLoaderContent />}>
      <ContentLayout particles>
        <HomeHero />
        <Suspense fallback={<SpinLoaderContent />}>
          <HomeCharacters data={CHARACTERS} />
        </Suspense>
      </ContentLayout>
    </Suspense>
  )
}
