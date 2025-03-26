import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"
import { DesktopThumbnail, MobileThumbnail } from '@/assets/images/_index'
import { FocalLight } from '@/components/focal-light'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { motion } from 'framer-motion'
import Image from 'next/image' 
import Link from 'next/link'

export function HomeHero() {
  return (
    <div className='md:py-20'>
      <AnimatedShinyText className='relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300'>
        {'Tu web amigable para guías de Genshin Impact'
          .split(' ')
          .map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: 'easeInOut',
              }}
              className='mr-2 inline-block'
            >
              {word}
            </motion.span>
          ))}
      </AnimatedShinyText>
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          delay: 0.8,
        }}
        className='relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400'
      >
        Esta plataforma ofrece guías simples y accesibles sobre los personajes
        de Genshin Impact.
      </motion.p>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          delay: 1,
        }}
        className='relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4'
      >
        <Link
          href='/characters'
          className='animate-fade-in -translate-y-4 opacity-0 [--animation-delay:600ms]'
        >
          <RainbowButton>Ver personajes</RainbowButton>
        </Link>
      </motion.div>

      <div className='relative flex justify-center'>
        <FocalLight />

        <figure className='w-full mt-8 md:mt-20 px-4 md:px-8 z-20 overflow-clip select-none pointer-events-none'>
          <Image
            width={1980}
            height={1080}
            src={MobileThumbnail.src}
            alt='Mobile Mockup'
            className='size-full object-contain block xs:hidden '
          />

          <Image
            width={1980}
            height={1080}
            src={DesktopThumbnail.src}
            alt='Desktop Mockup'
            className='size-full object-contain hidden xs:block'
          />
        </figure>
      </div>
    </div>
  )
}
