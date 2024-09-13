import {
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Group,
  Users2,
  Sword,
  Crown,
  Box,
} from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/panel',
          label: 'Panel',
          active: pathname === '/panel',
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Contenido',
      menus: [
        {
          href: '/panel/characters',
          label: 'Personajes',
          active: pathname.includes('/characters'),
          icon: Users2,
          submenus: [],
        },
        {
          href: '/panel/weapons',
          label: 'Armas',
          active: pathname.includes('/weapons'),
          icon: Sword,
          submenus: [],
        },
        {
          href: '/panel/artifacts',
          label: 'Artefactos',
          active: pathname.includes('/artifacts'),
          icon: Crown,
          submenus: [],
        },
        {
          href: '/panel/materials',
          label: 'Materiales',
          active: pathname.includes('/materials'),
          icon: Box,
          submenus: [],
        },
        {
          href: '/panel/teams',
          label: 'Equipos',
          active: pathname.includes('/teams'),
          icon: Group,
          submenus: [],
        },
      ],
    },
  ]
}
