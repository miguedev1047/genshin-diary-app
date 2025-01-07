import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { TierList } from '@/app/(panel)/panel/tierlist/_components/tierlist-list'
import { getTierList } from '@/app/(panel)/panel/tierlist/_services/fetch'
import { HeaderWrapper } from '@/components/header-wrapper'
import { TierlistHeader } from '@/components/headers/tierlist-header'


export default async function PanelTierlistPage() {
  const TIERLISTS = await getTierList()
  if (!TIERLISTS) return null

  return (
    <ContentLayout title='Tierlist'>
      <HeaderWrapper>
        <TierlistHeader isCreator />
      </HeaderWrapper>

      <TierList data={TIERLISTS} />
    </ContentLayout>
  )
}
