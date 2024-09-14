import { PanelLayout } from "@/shared/layouts/panel/panel-layout"

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PanelLayout>{children}</PanelLayout>
}
