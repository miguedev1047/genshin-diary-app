import { ContentLayout } from '@/app/(index)/_components/content-layout'
import { HomeHero } from '@/app/(index)/(routes)/(home)/_components/home-hero'

export default function Home() {
  return (
    <ContentLayout particles>
      <HomeHero />
    </ContentLayout>
  )
}
