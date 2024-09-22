import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { PAGE_NAME } from '@/consts/site'
import '@/styles/styles.css'

const onest = Onest({ subsets: ['latin'] })

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
    <html lang='es'>
      <body
        className={cn(
          'relative w-full min-h-screen bg-background antialiased',
          onest.className
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
