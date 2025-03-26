'use client'

import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { CharacterCardDemoImg } from '@/assets/images/_index'
import { motion } from 'framer-motion'
import { SearchPlayerInput } from '../search-player-input'
import { BorderBeam } from '@/components/magicui/border-beam'
import Image from 'next/image'

export function PlayerInfo() {
  return (
    <div className='md:py-20'>
      <AnimatedShinyText className='relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300'>
        {'Tarjetas de exhibición para tus personajes'
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
        Obtén los datos desde tu Exhibición de Personajes y muéstralos a través
        de una tarjeta de equipamiento, con un solo click.
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
        <SearchPlayerInput />
      </motion.div>

      <div className='relative flex justify-center'>
        <div className='w-full mt-8 md:mt-20 px-4 md:px-8 z-20 select-none pointer-events-none'>
          <figure className='size-full p-3 md:p-6 bg-accent rounded-(--radius) relative overflow-clip'>
            <Image
              width={1980}
              height={1080}
              src={CharacterCardDemoImg.src}
              alt='Character Card Demo'
              className='size-full object-contain'
            />

            <BorderBeam />
          </figure>
        </div>
      </div>
    </div>
  )
}
