import { ParticlesBackground } from '@/components/shared/particles-background'
import { Header } from './components/header'
import { Hero } from './components/hero'

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
