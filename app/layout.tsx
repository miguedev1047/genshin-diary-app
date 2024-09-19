import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { PAGE_NAME } from '@/consts/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: PAGE_NAME,
  description: `Bienvenido a ${PAGE_NAME} una web que ofrece guias de genshin impact de una manera amigable.`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'relative w-full min-h-screen bg-background antialiased',
          inter.className
        )}
      >
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  )
}
