import { ParticlesBackground } from '@/components/particles-background'
import { Header } from '@/app/(index)/_components/header'
import { ContentLayoutProps } from '@/app/(index)/_components/content-layout/content-layout.type'

export function ContentLayout(props: ContentLayoutProps) {
  const { children } = props

  return (
    <>
      <ParticlesBackground />
      
      <Header />
      <main className='py-20 container mx-auto relative z-20'>{children}</main>
    </>
  )
}
