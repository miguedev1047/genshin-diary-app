import { SidebarProvider } from '@/components/ui/sidebar'
import { PanelSidebar } from '@/app/(panel)/_components/panel-sidebar'
import { cookies } from 'next/headers'

export function PanelLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <PanelSidebar />
      {children}
    </SidebarProvider>
  )
}
