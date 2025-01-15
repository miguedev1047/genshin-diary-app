import GenshinDiaryLogo from '@/public/genshin-diary-logo.png'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link
      href={'/'}
      className='w-[128px] h-auto'
    >
      <Image
        src={GenshinDiaryLogo.src}
        width={1280}
        height={720}
        alt='Genshin Logo App'
      />
    </Link>
  )
}
