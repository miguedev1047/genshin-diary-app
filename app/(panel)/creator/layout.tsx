import { PanelLayout } from '@/app/(panel)/_components/panel-layout'

export default function CreatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PanelLayout>{children}</PanelLayout>
}
