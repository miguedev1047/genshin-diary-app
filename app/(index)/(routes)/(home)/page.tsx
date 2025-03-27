import { ContentLayout } from '@/app/(index)/_components/content-layout'
import { HomeSection } from '@/app/(index)/(routes)/(home)/_sections/home-section/home-section'

export default function Home() {
  return (
    <ContentLayout particles>
      <HomeSection />
    </ContentLayout>
  )
}
