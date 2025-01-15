import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/app/(index)/_components/navbar'
import { Logo } from '@/app/(index)/_components/logo'

export function Header() {
  return (
    <header className='sticky top-0 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary px-16 z-40'>
      <div className='max-w-7xl mx-auto flex h-16 items-center '>
        <nav className='flex flex-grow basis-0 items-center gap-3'>
          <Logo />
          <Badge>Beta</Badge>
        </nav>

        <Navbar />

        
      </div>
    </header>
  )
}
