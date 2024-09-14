import { ParticlesBackground } from '@/shared/components/particles-background'
import { Header } from '@/shared/layouts/index/header'
import { Hero } from '@/app/(index)/_sections/hero'
import { Characters } from '@/app/(index)/_sections/characters'

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Characters/>
      </main>

      <ParticlesBackground />
    </>
  )
}
