import { Hero } from './_components/hero'
import { ParticlesBackground } from '@/shared/components/particles-background'
import { Header } from '@/shared/layouts/index/header'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>

      <ParticlesBackground />
    </>
  )
}
