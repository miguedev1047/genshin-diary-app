'use client'

import { Logo } from '@/app/(index)/_components/logo'
import { DesktopThumbnail } from '@/assets/images/_index'
import { FocalLight } from '@/components/focal-light'
import { Android } from '@/components/ui/android'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Safari } from '@/components/ui/safari'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function HomeHero() {
  return (
    <section className='relative mx-auto my-10 max-w-7xl grid place-items-center space-y-6'>
      <article className='block lg:hidden'>
        <Logo className='w-full max-w-[320px]' />
      </article>
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

          <div className='w-full mt-10 md:mt-20 px-4 md:px-8 z-20 overflow-clip'>
            <Android
              className='size-full block xs:hidden '
              src={DesktopThumbnail.src}
            />

            <Safari
              className='size-full hidden xs:block'
              imageSrc={DesktopThumbnail.src}
            />
          </div>

          {/* <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
              delay: 1.2,
            }}
            className='relative overflow-clip z-10 mt-10 md:mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-2 md:p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900'
          >
            

            <div className='w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700'>
              <Image
                src={DesktopThumbnail.src}
                alt='Landing page preview'
                className='aspect-[16/9] h-auto w-full object-cover'
                height={1000}
                width={1000}
              />
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  )
}
