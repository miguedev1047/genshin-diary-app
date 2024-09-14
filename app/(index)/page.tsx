import { ParticlesBackground } from '@/shared/components/particles-background'
import { Header } from '@/shared/layouts/index/header'
import { Hero } from '@/app/(index)/_sections/hero'
import { Characters } from '@/app/(index)/_sections/characters'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <Suspense>
      <Header />
      <main>
        <Hero />
        <Characters/>
      </main>

      <ParticlesBackground />
    </Suspense>
  )
}
