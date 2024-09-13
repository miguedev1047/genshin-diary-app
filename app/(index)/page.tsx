import { ParticlesBackground } from '@/shared/components/particles-background'
import { Header } from '@/shared/layouts/index/header'
import { Hero } from '@/app/(index)/_components/hero'
import { Characters } from '@/app/(index)/_components/characters'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Characters />
      </main>

      <ParticlesBackground />
    </>
  )
}
