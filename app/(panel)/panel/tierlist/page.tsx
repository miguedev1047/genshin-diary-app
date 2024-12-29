import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { HeaderWrapper } from '@/components/header-wrapper'
import { TierlistHeader } from '@/app/(panel)/_components/headers/tierlist-header'
import { TierList } from '@/app/(panel)/panel/tierlist/_components/tierlist-list'
import { getTierList } from '@/app/(panel)/panel/tierlist/_services/fetch'

export default async function PanelTierlistPage() {
  const TIERLISTS = await getTierList()
  if (!TIERLISTS) return null

  return (
    <ContentLayout title='Tierlist'>
      <HeaderWrapper>
        <TierlistHeader />
      </HeaderWrapper>

      <TierList data={TIERLISTS} />
    </ContentLayout>
  )
}
