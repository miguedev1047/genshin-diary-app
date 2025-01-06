import { ContentLayout } from '@/app/(index)/_components/content-layout'

export default function ArtifactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentLayout>
      {children}
    </ContentLayout>
  )
}
