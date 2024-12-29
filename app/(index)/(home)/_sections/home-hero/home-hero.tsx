import { RainbowButton } from '@/components/ui/rainbow-button'
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import Link from 'next/link'

export function HomeHero() {
  return (
    <section className='relative mx-auto max-w-7xl h-[calc(100dvh-9rem)] px-6 text-center md:px-8 grid place-items-center z-20'>
      <div className='-translate-y-8'>
        <AnimatedShinyText className='inline-flex max-w-full py-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none tracking-tighter'>
          Tu web amigable para guías de Genshin Impact.
        </AnimatedShinyText>

        <p className='animate-fade-in mb-8 -translate-y-4 text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl'>
          Esta plataforma ofrece guías simples y accesibles sobre los personajes
          de Genshin Impact.
        </p>

        <Link
          href='#characters'
          className='animate-fade-in -translate-y-4 opacity-0 [--animation-delay:600ms]'
        >
          <RainbowButton>Ver personajes</RainbowButton>
        </Link>
      </div>
    </section>
  )
}
