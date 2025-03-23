import { ContentLayout } from '@/app/(index)/_components/content-layout'

export default function WeaponLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentLayout>
      <div className='fixed top-12 -right-64 h-[500px] w-[500px] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[120px]'></div>
      {children}
    </ContentLayout>
  )
}
