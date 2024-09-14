'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Home, LayoutGrid, LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { handleSignout } from '@/features/helpers/sign-out'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function UserNav() {
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='relative h-8 w-8 rounded-full'
              >
                <Avatar className='h-8 w-8'>
                  <AvatarImage
                    src='#'
                    alt='Avatar'
                  />
                  <AvatarFallback className='bg-transparent'>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Perfil</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='hover:cursor-pointer'
            asChild
          >
            <Link
              href='/panel'
              className='flex items-center'
            >
              <LayoutGrid className='w-4 h-4 mr-3 text-muted-foreground' />
              Panel
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='hover:cursor-pointer'
            asChild
          >
            <Link
              href='/'
              className='flex items-center'
            >
              <Home className='w-4 h-4 mr-3 text-muted-foreground' />
              Inicio
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => handleSignout()}
        >
          <LogOut className='w-4 h-4 mr-3 text-muted-foreground' />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
