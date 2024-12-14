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
    <div className='-z-[1] absolute w-full h-dvh -top-0'>
      <Particles
        className='size-full'
        quantity={150}
        ease={80}
        color={color}
        refresh
      />
    </div>
  )
}
