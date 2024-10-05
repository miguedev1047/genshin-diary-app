import { ParticlesBackground } from '@/shared/components/particles-background'
import { Header } from '@/shared/layouts/index/header'
import { Hero } from '@/app/(index)/_sections/hero'
import { Characters } from '@/app/(index)/_sections/characters'
import { CharacterProvider } from '@/app/(index)/providers'
import { PageProps } from '@/app/(index)/_shared/types'
import { getCharacters } from '@/app/(index)/_shared/services/fetch'
import { Suspense } from 'react'

export default async function Home(props: PageProps) {
  const { searchParams } = props

  const CHARACTERS = await getCharacters({
    name: searchParams.name,
    element: searchParams.element,
    weapon: searchParams.weapon,
    stars: searchParams.stars,
  })

  return (
    <>
      <Header />
      <main className='py-20'>
        <CharacterProvider data={CHARACTERS}>
          <Suspense>
            <Hero />
            <Characters />
          </Suspense>
        </CharacterProvider>
      </main>

      <ParticlesBackground />
    </>
  )
}
