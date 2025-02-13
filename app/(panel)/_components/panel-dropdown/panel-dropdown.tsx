import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronsUpDown,
  House,
  LayoutGrid,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { useCurrentUser } from '@/features/hooks/use-session'
import { useTheme } from 'next-themes'
import { handleSignout } from '@/features/helpers/sign-out'
import Link from 'next/link'

export function PanelDropdown() {
  const SESSION = useCurrentUser()
  const FIRST_LETTER_NAME = SESSION?.name?.slice(0, 1)

  const { theme, setTheme } = useTheme()
  const IS_DARK_MODE = theme === 'dark'

  const handleThemeChange = (value: boolean) => {
    if (value) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  if (!SESSION) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='rounded-lg'>
                  {FIRST_LETTER_NAME}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{SESSION.name}</span>
                <span className='truncate text-xs'>{SESSION.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarFallback className='rounded-lg'>
                    {FIRST_LETTER_NAME}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{SESSION.name}</span>
                  <span className='truncate text-xs'>{SESSION.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href='/'
                  className='flex items-center gap-3'
                >
                  <House className='size-4' />
                  Inicio
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href='/panel'
                  className='flex items-center gap-3'
                >
                  <LayoutGrid className='size-4' />
                  Resumen
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex items-center justify-between'>
              <div className='flex items-center'>
                {IS_DARK_MODE ? (
                  <Moon className='mr-2 size-4' />
                ) : (
                  <Sun className='mr-2 size-4' />
                )}
                <span>Modo oscuro</span>
              </div>
              <Switch
                checked={IS_DARK_MODE}
                onCheckedChange={handleThemeChange}
                aria-label='Cambiar modo oscuro'
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignout}>
              <div className='flex items-center gap-3'>
                <LogOut className='size-4' />
                Cerrar sesión
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
