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
import { ChatAI } from '@/app/(panel)/_components/chat-ai'
import Link from 'next/link'

export function Header() {
  return (
    <>
      <header className='sticky top-0 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16 z-40'>
        <div className='max-w-7xl mx-auto flex h-16 items-center justify-between'>
          <nav className='flex flex-grow basis-0'>
            <Logo />
          </nav>

          <Navbar />

          <nav className='flex flex-grow basis-0 justify-end'>
            <PanelButton />
          </nav>
        </div>
      </header>
      <div className='fixed bottom-8 left-8'>
        <ChatAI />
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
            asChild
          >
            <Link href='/panel'>
              <User2 />
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
