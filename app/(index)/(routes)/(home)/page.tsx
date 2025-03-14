import { ContentLayout } from '@/app/(index)/_components/content-layout'
import { PageProps } from '@/app/(index)/(routes)/(home)/_types'
import { getCharacters } from '@/app/(index)/(routes)/(home)/_services/fetch'
import { HomeHero } from '@/app/(index)/(routes)/(home)/_sections/home-hero'
import { HomeCharacters } from '@/app/(index)/(routes)/(home)/_sections/home-characters'

export default async function Home(props: PageProps) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = await getCharacters(PARAMS)

  return (
    <ContentLayout particles>
      <HomeHero />
      <HomeCharacters data={CHARACTERS} />
    </ContentLayout>
  )
}
