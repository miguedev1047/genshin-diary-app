import { ModeToggle } from "@/shared/components/mode-toggle"
import { UserNav } from "@/shared/layouts/panel/user-nav"
import { PanelNavbarProps } from "@/shared/layouts/panel/panel-navbar/panel-navbar.type"
import { SheetMenu } from "@/shared/layouts/panel/sheet-menu"

export function PanelNavbar(props: PanelNavbarProps) {
  const { title } = props
  return (
    <header className='sticky top-0 z-30 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary'>
      <div className='mx-4 sm:mx-8 flex h-14 items-center'>
        <div className='flex items-center space-x-4 lg:space-x-0'>
          <SheetMenu />
          <h1 className='font-bold'>{title}</h1>
        </div>
        <div className='flex flex-1 items-center space-x-2 justify-end'>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
