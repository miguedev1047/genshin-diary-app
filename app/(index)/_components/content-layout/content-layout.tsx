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
      <main className='pt-16 md:py-12 lg:py-20 px-4 container max-w-[1240px] h-full min-h-dvh mx-auto relative z-20'>
        {children}
      </main>
      <Footer />
    </>
  )
}
