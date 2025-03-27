import { Logo } from '@/app/(index)/_components/logo'
import { HomeHero } from '@/app/(index)/(routes)/(home)/_components/home-hero'

export function HomeSection() {
  return (
    <section className='relative mx-auto my-10 max-w-7xl grid place-items-center space-y-6 pb-16'>
      <article className='block lg:hidden'>
        <Logo className='w-full max-w-[320px]' />
      </article>
      
      <HomeHero />
    </section>
  )
}
