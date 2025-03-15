'use client'

import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import GenshinDarkLogo from '@/public/dark-logo.svg'
import GenshinLightLogo from '@/public/light-logo.svg'

const DarkLogo = GenshinDarkLogo.src
const LightLogo = GenshinLightLogo.src

export function Logo() {
  const { theme } = useTheme()
  
  const CURRENT_LOGO = theme !== 'dark' ? DarkLogo : LightLogo

  return (
    <Link
      href={'/'}
      className='w-[136px] h-auto flex items-center gap-3'
    >
      <Image
        src={CURRENT_LOGO}
        width={1280}
        height={720}
        alt='Genshin Logo App'
        className='size-full object-cover'
      />
      <Badge>Beta</Badge>
    </Link>
  )
}
