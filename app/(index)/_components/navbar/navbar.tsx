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

export function Navbar() {
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
