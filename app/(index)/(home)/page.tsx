import { CharacterProps, PageProps } from '@/app/(index)/(home)/_types'
import { getCharacters } from '@/app/(index)/(home)/_services/fetch'
import { ParticlesBackground } from '@/components/particles-background'
import { Header } from '@/app/(index)/_components/header'
import { HomeHero } from '@/app/(index)/(home)/_sections/home-hero'
import { HomeCharacters } from '@/app/(index)/(home)/_sections/home-characters'

export default async function Home(props: PageProps) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = await getCharacters(PARAMS) as Array<CharacterProps>
  
  return (
    <>
      <Header />
      
      <main className='py-20'>
        <HomeHero />
        <HomeCharacters data={CHARACTERS} />
      </main>

      <ParticlesBackground />
    </>
  )
}
