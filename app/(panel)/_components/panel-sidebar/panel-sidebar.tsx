import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { PAGE_NAME, PAGE_VERSION } from '@/consts/misc'
import { ADMIN_SIDEBAR_ROUTES, EDITOR_SIDEBAR_ROUTES } from '@/lib/menu-list'
import { GalleryVerticalEnd } from 'lucide-react'
import { PanelDropdown } from '@/app/(panel)/_components/panel-dropdown'
import { isCurrentRole } from '@/data/auth'
import Link from 'next/link'

export async function PanelSidebar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              asChild
            >
              <Link href='/panel'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                  <GalleryVerticalEnd className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    Panel {PAGE_NAME}
                  </span>
                  <span className='truncate text-xs'>{PAGE_VERSION}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administrar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(await isCurrentRole('OWNER')) &&
                ADMIN_SIDEBAR_ROUTES.sidebar_items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              {(await isCurrentRole('ADMIN')) &&
                ADMIN_SIDEBAR_ROUTES.sidebar_items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              {(await isCurrentRole('EDITOR')) &&
                EDITOR_SIDEBAR_ROUTES.sidebar_items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <PanelDropdown />
      </SidebarFooter>
      <SidebarRail aria-label='Alternar barra lateral' />
    </Sidebar>
  )
}
