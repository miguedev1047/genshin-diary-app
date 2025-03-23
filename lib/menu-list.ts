import {
  ArtifactImg,
  CharacterImg,
  MaterialImg,
  WeaponImg,
} from '@/assets/images/_index'
import {
  Users2,
  Sword,
  Box,
  Hourglass,
  Group,
  Lock,
} from 'lucide-react'

export const ADMIN_SIDEBAR_ROUTES = {
  sidebar_items: [
    {
      title: 'Personajes',
      url: '/panel/characters',
      icon: Users2,
    },
    {
      title: 'Armas',
      url: '/panel/weapons',
      icon: Sword,
    },
    {
      title: 'Arterfactos',
      url: '/panel/artifacts',
      icon: Hourglass,
    },
    {
      title: 'Materiales',
      url: '/panel/materials',
      icon: Box,
    },
    {
      title: 'Equipos',
      url: '/panel/teams',
      icon: Group,
    },
    {
      title: 'Cuentas',
      url: '/panel/accounts',
      icon: Lock,
    },
  ],
}

export const EDITOR_SIDEBAR_ROUTES = {
  sidebar_items: [
    {
      title: 'Personajes',
      url: '/panel/characters',
      icon: Users2,
    },
    {
      title: 'Armas',
      url: '/panel/weapons',
      icon: Sword,
    },
    {
      title: 'Arterfactos',
      url: '/panel/artifacts',
      icon: Hourglass,
    },
    {
      title: 'Materiales',
      url: '/panel/materials',
      icon: Box,
    },
    {
      title: 'Equipos',
      url: '/panel/teams',
      icon: Group,
    },
  ],
}

export const PANEL_QUICK_LINKS = [
  {
    title: 'Personajes',
    href: '/panel/characters',
    src: CharacterImg.src,
  },
  {
    title: 'Armas',
    href: '/panel/weapons',
    src: WeaponImg.src,
  },
  {
    title: 'Artefactos',
    href: '/panel/artifacts',
    src: ArtifactImg.src,
  },
  {
    title: 'Materiales',
    href: '/panel/materials',
    src: MaterialImg.src,
  },
]

export const HOME_ROUTES = [
  {
    title: 'Inicio',
    href: '/',
  },
  {
    title: 'Personajes',
    href: '/characters',
  },
  {
    title: 'Armas',
    href: '/weapons',
  },
  {
    title: 'Artefactos',
    href: '/artifacts',
  },
  {
    title: 'Materiales',
    href: '/materials',
  },
  {
    title: 'Equipos',
    href: '/teams',
  },
]
