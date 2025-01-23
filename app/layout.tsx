import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import { Providers } from '@/app/providers'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { PAGE_NAME, REACT_SCAN } from '@/consts/misc'
import { DEV_MODE } from '@/consts/misc'
import { AuthWrapper } from '@/features/providers/auth-provider/auth.wrapper'
import { DataWrapper } from '@/features/providers/data-provider/data.wrapper'
import NextTopLoader from 'nextjs-toploader'

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
      {DEV_MODE && REACT_SCAN && (
        <head>
          <script
            src='https://unpkg.com/react-scan/dist/auto.global.js'
            async
          />
        </head>
      )}
      <body
        className={cn(
          'relative w-full min-h-screen bg-background antialiased',
          onest.className
        )}
      >
        <AuthWrapper>
          <DataWrapper>
            <Providers>
              <NextTopLoader
                color='#FABC3F'
                showSpinner={false}
              />
              <Toaster />
              {children}
            </Providers>
          </DataWrapper>
        </AuthWrapper>
      </body>
    </html>
  )
}
