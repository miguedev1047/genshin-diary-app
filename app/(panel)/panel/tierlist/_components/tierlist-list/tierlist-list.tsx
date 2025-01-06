import type { TierList } from '@prisma/client'
import { TierlistListProps } from '@/app/(panel)/panel/tierlist/_components/tierlist-list/tierlist-list.type'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { TierRows } from '@/app/(panel)/panel/tierlist/_components/tier-rows'
import { TierActions } from '@/app/(panel)/panel/tierlist/_components/tier-actions'

export function TierList(props: TierlistListProps) {
  const { data: TIERLISTS } = props

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
      <TierActions id={tierlist.id} />
      <TierRows rows={tierlist.tiers} />
    </TabsContent>
  ))

  return (
    <Card className='p-6'>
      <Tabs
        defaultValue={`tab-${DEFAULT_TAB?.id}`}
        className='space-y-4 relative'
      >
        <TabsList className='h-auto rounded-none border-b border-border bg-transparent p-0'>
          {MAPPED_TABS}
        </TabsList>
        {MAPPED_CONTENT}
      </Tabs>
    </Card>
  )
}
