'use client'


import { Button } from '@/components/ui/button'
import { PanelsTopLeft } from 'lucide-react'
import { useSidebarToggle } from '@/features/store/use-sidebar-toggle'
import { useStore } from '@/features/store/use-store'
import { SidebarToggle } from '@/shared/layouts/panel/sidebar-toggle'
import { Menu } from '@/shared/layouts/panel/menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-30 bg-background h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle
        isOpen={sidebar?.isOpen}
        setIsOpen={sidebar?.setIsOpen} />
      <div className='relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md bg-white dark:bg-main-primary border border-border overflow-clip'>
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant='transparent'
          asChild
        >
          <div className='flex items-center gap-2'>
            <Link
              href='/panel'
              className='flex items-center gap-2'
            >
              <PanelsTopLeft className='w-6 h-6 mr-1' />
            </Link>
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                sidebar?.isOpen === false
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100'
              )}
            >
              Admin Panel
            </h1>
          </div>
        </Button>

        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  )
}

