import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/app/(index)/_components/navbar'
import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className='sticky top-0 z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary px-16'>
      <div className='max-w-7xl mx-auto flex h-16 items-center '>
        <nav className='flex flex-grow basis-0 items-center gap-3'>
          <Link
            href={'/'}
            className='font-extrabold uppercase'
          >
            Genshin Diary
          </Link>
          <Badge>Beta</Badge>
        </nav>

        <Navbar />

        <nav className='flex flex-grow justify-end basis-0'>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
