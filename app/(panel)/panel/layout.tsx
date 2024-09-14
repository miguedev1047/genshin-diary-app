import { PanelLayout } from '@/shared/layouts/panel/panel-layout'
import NextTopLoader from 'nextjs-toploader'

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PanelLayout>
      <NextTopLoader
        color='#FABC3F'
        showSpinner={false}
      />
      {children}
    </PanelLayout>
  )
}
