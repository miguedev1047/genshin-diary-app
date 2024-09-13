'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Particles from '@/components/magicui/particles'

export function ParticlesBackground() {
  const { theme } = useTheme()
  const [color, setColor] = useState('#ffffff')

  useEffect(() => {
    setColor(theme === 'dark' ? '#ffffff' : '#000000')
  }, [theme])

  return (
    <div className='absolute inset-x-0 top-0 w-full h-[calc(100dvh-4rem)] [mask-image:linear-gradient(to_b,transparent,white)]'>
      <Particles
        className='size-full'
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}
