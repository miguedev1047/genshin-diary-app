import { ContentLayout } from '@/app/(index)/_components/content-layout'

export default function MaterialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ContentLayout>{children}</ContentLayout>
}
