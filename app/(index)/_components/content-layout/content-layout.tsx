import { ParticlesBackground } from '@/components/particles-background'
import { Header } from '@/app/(index)/_components/header'
import { ContentLayoutProps } from '@/app/(index)/_components/content-layout/content-layout.type'
import { Footer } from '@/app/(index)/_components/footer'

export function ContentLayout(props: ContentLayoutProps) {
  const { children, particles = false } = props

  return (
    <>
      {particles && <ParticlesBackground />}

      <Header />
      <main className='py-20 container max-w-[1240px] mx-auto relative z-20'>
        {children}
      </main>
      <Footer />
    </>
  )
}
