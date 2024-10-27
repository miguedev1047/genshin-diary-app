'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { PanelSidebar } from '../panel-sidebar'
import { GridBackground } from '@/shared/components/grid-background'
import { useSidebarToggle } from '@/features/store/use-sidebar-toggle'
import { useStore } from '@/features/store/use-store'

export function PanelLayout({ children }: { children: React.ReactNode }) {
  const sidebarHook = useStore(useSidebarToggle, (state) => state)
  if (!sidebarHook) return null

  return (
    <SidebarProvider
      open={sidebarHook.isOpen}
      onOpenChange={sidebarHook.setIsOpen}
    >
      <GridBackground />

      <PanelSidebar />

      {children}
    </SidebarProvider>
  )
}
