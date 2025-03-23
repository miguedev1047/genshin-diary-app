import { PanelLayout } from '@/app/(panel)/_components/panel-layout'

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <PanelLayout>{children}</PanelLayout>
  )
}
