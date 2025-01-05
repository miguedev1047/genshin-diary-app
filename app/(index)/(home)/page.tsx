import { CharacterProps, PageProps } from '@/app/(index)/(home)/_types'
import { getCharacters } from '@/app/(index)/(home)/_services/fetch'
import { HomeHero } from '@/app/(index)/(home)/_sections/home-hero'
import { HomeCharacters } from '@/app/(index)/(home)/_sections/home-characters'
import { Suspense } from 'react'
import { SpinLoaderContent } from '@/components/spin-loaders'
import { ContentLayout } from '@/app/(index)/_components/content-layout'

export default async function Home(props: PageProps) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = (await getCharacters(PARAMS)) as Array<CharacterProps>

  return (
    <ContentLayout particles>
      <HomeHero />
      <Suspense fallback={<SpinLoaderContent />}>
        <HomeCharacters data={CHARACTERS} />
      </Suspense>
    </ContentLayout>
  )
}
