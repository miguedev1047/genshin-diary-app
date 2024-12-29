'use client'

import { useTheme } from 'next-themes'
import Particles from '@/components/magicui/particles'

export function ParticlesBackground() {
  const { theme } = useTheme()
  if (theme === 'light') return null

  return (
    <div className='absolute w-full h-dvh -top-0 z-10'>
      <Particles
        className='size-full'
        quantity={150}
        ease={80}
        color={'#ffffff'}
        refresh
      />
    </div>
  )
}
