import { HeaderWrapper } from '@/components/header-wrapper'
import { TierlistHeader } from '@/components/headers/tierlist-header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getTierList } from '@/app/(index)/(routes)/tierlist/_services/fetch'
import { BorderBeam } from '@/components/magicui/border-beam'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TierRows } from '@/app/(index)/(routes)/tierlist/_components/tier-rows'

export default async function TierlistPage() {
  const TIERLISTS = await getTierList()
  
  if (!TIERLISTS) return redirect('/')
  const [DEFAULT_TAB] = TIERLISTS

  const MAPPED_TABS = TIERLISTS.map((tierlist) => (
    <TabsTrigger
      key={tierlist.id}
      value={`tab-${tierlist.id}`}
      className='relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary'
    >
      {tierlist.tier_category}
    </TabsTrigger>
  ))

  const MAPPED_CONTENT = TIERLISTS.map((tierlist) => (
    <TabsContent
      key={tierlist.id}
      value={`tab-${tierlist.id}`}
    >
      <TierRows rows={tierlist.tiers} />
    </TabsContent>
  ))

  return (
    <section className='relative'>
      <Card className='relative overflow-clip['>
        <CardHeader>
          <HeaderWrapper>
            <TierlistHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={`tab-${DEFAULT_TAB?.id}`}
            className='space-y-4 relative'
          >
            <TabsList className='grid grid-cols-4 gap-4 h-auto rounded-none border-b border-border bg-transparent p-0'>
              {MAPPED_TABS}
            </TabsList>
            {MAPPED_CONTENT}
          </Tabs>
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
