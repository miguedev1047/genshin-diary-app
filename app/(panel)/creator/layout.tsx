import { PanelLayout } from '@/shared/layouts/panel/panel-layout'

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PanelLayout>{children}</PanelLayout>
}
