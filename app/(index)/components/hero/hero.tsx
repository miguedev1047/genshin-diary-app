import { Button } from '@/components/ui/button'
import TextShimmer from '@/components/magicui/text-shimmer'
import Link from 'next/link'

export function Hero() {
  return (
    <section className='relative mx-auto max-w-7xl h-[calc(100dvh-4rem)] px-6 text-center md:px-8 grid place-items-center'>
      <div>
        <TextShimmer className='inline-flex max-w-full'>
          <span className='animate-fade-in -translate-y-4 text-balance bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium opacity-0 [--animation-delay:200ms] leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40'>
            Tu web amigable para guías de Genshin Impact.
          </span>
        </TextShimmer>

        <p className='animate-fade-in mb-12 -translate-y-4 text-balance text-lg tracking-tight text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl'>
          Este sitio web es una plataforma dedicada a ofrecer guías sencillas y
          accesibles
          <br className='hidden md:block' /> para los personajes de Genshin
          Impact.
        </p>

        <Button
          variant='ringHover'
          className='animate-fade-in -translate-y-4 opacity-0 [--animation-delay:600ms]'
          asChild
        >
          <Link href='#characters'>Ver personajes</Link>
        </Button>
      </div>
    </section>
  )
}
