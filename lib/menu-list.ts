import { Users2, Sword, Box, Hourglass } from 'lucide-react'

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
  ],
}
