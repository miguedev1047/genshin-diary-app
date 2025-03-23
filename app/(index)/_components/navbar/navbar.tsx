'use client'

import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { HOME_ROUTES } from '@/lib/menu-list'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Logo } from '../logo'

export function DesktopNavbar() {
  return (
    <NavigationMenu className='hidden xl:block sm:hidden'>
      <NavigationMenuList>
        {HOME_ROUTES.map(({ title, href }) => (
          <NavigationMenuItem
            key={title}
            asChild
          >
            <Link
              href={href}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size='icon'
          variant='outline'
          className='rounded-full w-8 h-8 bg-background md:hidden'
        >
          <Menu className='w-[1.2rem] h-[1.2rem]' />
        </Button>
      </SheetTrigger>
      <SheetContent
        closeButton={false}
        className='max-w-[275px]'
      >
        <SheetHeader>
          <Logo />
        </SheetHeader>

        <ul className='flex flex-col gap-1 mt-2'>
          {HOME_ROUTES.map(({ title, href }) => (
            <li
              key={href}
              className='w-full p-2 hover:bg-accent rounded-(--radius)'
            >
              <Link href={href}>{title}</Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
