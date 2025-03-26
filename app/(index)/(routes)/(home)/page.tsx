import { ContentLayout } from '@/app/(index)/_components/content-layout'
import { HomeSection } from '@/app/(index)/(routes)/(home)/_sections/home-section/home-section'
import { PlayerSection } from '@/app/(index)/(routes)/(home)/_sections/player-section'

export default function Home() {
  return (
    <ContentLayout particles>
      <HomeSection />
      <PlayerSection />
    </ContentLayout>
  )
}
