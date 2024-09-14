import {
  Sheet,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
  SheetContent,
} from '@/components/ui/sheet'
import { MenuIcon, PanelsTopLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Menu } from '@/shared/layouts/panel/menu'
import Link from 'next/link'

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger
        className='lg:hidden'
        asChild
      >
        <Button
          className='h-8'
          variant='transparent'
          size='icon'
        >
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className='sm:w-72 px-3 flex flex-col'
        side='left'
      >
        <SheetHeader className='pb-0'>
          <Button
            className='flex justify-center items-center'
            asChild variant='transparent'
          >
            <Link
              href='/dashboard'
              className='flex items-center gap-2'
            >
              <PanelsTopLeft className='w-6 h-6 mr-1' />
              <SheetTitle className='font-bold text-lg'>Admin Panel</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}

