import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DesktopNavbar, MobileNavbar } from '@/app/(index)/_components/navbar'
import { Logo } from '@/app/(index)/_components/logo'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'
import { User2 } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <>
      <header className='fixed md:sticky bottom-0 md:top-0 w-full bg-background/95 shadow-sm border-t md:border-b backdrop-blur-sm supports-backdrop-filter:bg-background/60 px-2 md:px-16 z-40'>
        <div className='max-w-7xl mx-auto flex h-16 items-center justify-between'>
          <nav className='flex grow basis-0 max-md:hidden'>
            <Logo />
          </nav>

          <DesktopNavbar />

          <nav className='flex grow basis-0 justify-start md:justify-end'>
            <div className='flex items-center gap-1'>
              <MobileNavbar />
              <ThemeToggle />
              <PanelButton />
            </div>
          </nav>
        </div>
      </header>
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
