import { ContentLayout } from '@/app/(index)/_components/content-layout'

export default function PlayerCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentLayout particles>
      {children}
    </ContentLayout>
  )
}
