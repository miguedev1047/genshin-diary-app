'use client'

import { useTheme } from 'next-themes'

export function FocalLight() {
  const { theme } = useTheme()
  if (theme === 'light') return null
  
  return (
    <div className='overflow-clip before:z-0 before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--focal-light),var(--focal-light),transparent_40%)] before:[filter:blur(180px)] before:animate-image-glow' />
  )
}
