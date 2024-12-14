import { RainbowButton } from '@/components/ui/rainbow-button'
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import Link from 'next/link'

export function HomeHero() {
  return (
    <section className='relative mx-auto max-w-7xl h-[calc(100dvh-9rem)] px-6 text-center md:px-8 grid place-items-center'>
      <div className='-translate-y-8'>
        <AnimatedShinyText className='inline-flex max-w-full'>
          <span className='animate-fade-in -translate-y-4 text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium opacity-0 [--animation-delay:200ms] leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40'>
            Tu web amigable para guías de Genshin Impact.
          </span>
        </AnimatedShinyText>

        <p className='animate-fade-in mb-8 -translate-y-4 text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl'>
          Esta plataforma ofrece guías simples y accesibles sobre los personajes de Genshin
          Impact.
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
