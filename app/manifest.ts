import { PAGE_NAME } from '@/consts/misc'
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Genshin Diary',
    short_name: 'Genshin Diary',
    description: `Bienvenido a ${PAGE_NAME} una web que ofrece guias de genshin impact de una manera amigable.`,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
