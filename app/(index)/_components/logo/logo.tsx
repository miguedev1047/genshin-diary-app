import { Badge } from '@/components/ui/badge'
import GenshinDiaryLogo from '@/public/genshin-diary-logo.png'
import Image from 'next/image'
import Link from 'next/link'
export function Logo() {

  return (
    <Link
      href={'/'}
      className='w-[128px] h-auto flex items-center gap-3'
    >
      <Image
        src={GenshinDiaryLogo.src}
        width={1280}
        height={720}
        alt='Genshin Logo App'
      />
      <Badge>Beta</Badge>
    </Link>
  )
}
