import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ContentLayoutProps } from '@/app/(panel)/_components/content-layout/content-layout.type'
import { PAGE_NAME } from '@/consts/misc'
import { GridBackground } from '@/components/grid-background'

export function ContentLayout(props: ContentLayoutProps) {
  const { title, children } = props
  const CURRENT_YEAR = new Date().getFullYear()

  return (
    <SidebarInset>
      <GridBackground />


      <header className='flex flex-1 justify-between z-50 items-center sticky top-0 border-b py-4 px-5 bg-background/70 backdrop-blur-2xl'>
        <nav className='flex items-center gap-2'>
          <SidebarTrigger />
          <Separator
            orientation='vertical'
            className='mx-2 h-4'
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      </header>

      <div className='min-h-[calc(100svh_-_8rem)] p-8 container mx-auto space-y-5'>
        {children}
      </div>

      <footer className='flex flex-1 border-t bg-background/70 backdrop-blur-2xl'>
        <div className='mx-4 md:mx-8 flex h-14 items-center'>
          <p className='text-xs md:text-sm leading-loose text-muted-foreground text-left'>
            Admin Panel - {PAGE_NAME} {CURRENT_YEAR}
          </p>
        </div>
      </footer>
    </SidebarInset>
  )
}
