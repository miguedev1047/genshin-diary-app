import { Users2, Sword, Box, Hourglass, Group, Trophy } from 'lucide-react'

export const SIDEBAR_DATA = {
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
      title: 'Tierlist',
      url: '/panel/tierlist',
      icon: Trophy,
    },
  ],
}
