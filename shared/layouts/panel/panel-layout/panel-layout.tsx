'use client'

import { cn } from '@/lib/utils'
import { useStore } from '@/features/store/use-store'
import { useSidebarToggle } from '@/features/store/use-sidebar-toggle'
import { Sidebar } from '@/shared/layouts/panel/sidebar'
import { PanelFooter } from '@/shared/layouts/panel/panel-footer'
import GridPattern from '@/components/magicui/grid-pattern'

export function PanelLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state)

  if (!sidebar) return null

  return (
    <>
      <GridPattern
        x={-1}
        y={-1}
        strokeDasharray={'4 4'}
        className={cn(
          '[mask-image:radial-gradient(1280px_circle_at_center,white,transparent)] fixed inset-0 z-0'
        )}
      />

      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_60px)] bg-transparent transition-[margin-left] ease-in-out duration-300 sticky',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72'
        )}
      >
        <PanelFooter />
      </footer>
    </>
  )
}
