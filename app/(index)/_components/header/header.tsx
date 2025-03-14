import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Navbar } from '@/app/(index)/_components/navbar'
import { Logo } from '@/app/(index)/_components/logo'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { User2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <>
      <header className='sticky top-0 w-full bg-background/95 shadow-sm border-b backdrop-blur-sm supports-backdrop-filter:bg-background/60 px-16 z-40'>
        <div className='max-w-7xl mx-auto flex h-16 items-center justify-between'>
          <nav className='flex grow basis-0'>
            <Logo />
          </nav>

          <Navbar />

          <nav className='flex grow basis-0 justify-end'>
            <div className='flex items-center gap-1'>
              <PanelButton />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
      <div className='fixed bottom-8 left-8'>
        
      </div>
    </>
  )
}

async function PanelButton() {
  const SESSION = await auth()
  if (!SESSION) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            variant='outline'
            className='rounded-full w-8 h-8 bg-background'
            asChild
          >
            <Link href='/panel'>
              <User2 className='w-[1.2rem] h-[1.2rem]' />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ir al panel</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
