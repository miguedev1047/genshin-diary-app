'use client'

import { GridBackground } from '@/components/grid-background'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useSidebarToggle } from '@/features/store/use-sidebar-toggle'
import { useStore } from '@/features/store/use-store'
import { PanelSidebar } from '@/app/(panel)/_components/panel-sidebar'

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
