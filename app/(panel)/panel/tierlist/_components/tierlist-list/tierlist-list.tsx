'use client'

import type { TierList } from '@prisma/client'
import { TierlistListProps } from '@/app/(panel)/panel/tierlist/_components/tierlist-list/tierlist-list.type'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { TierRows } from '@/app/(panel)/panel/tierlist/_components/tier-rows'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { Trash2 } from 'lucide-react'
import { deleteTierlist } from '@/app/(panel)/panel/tierlist/_services/delete'
import { useEffect, useState } from 'react'

export function TierList(props: TierlistListProps) {
  const { data: TIERLISTS } = props

  const DEFAULT_TAB = `tab-${TIERLISTS[0]?.id}`
  const [tierTab, setTierTab] = useState(DEFAULT_TAB)

  useEffect(() => {
    setTierTab(DEFAULT_TAB)
  }, [TIERLISTS, DEFAULT_TAB])

  if (!TIERLISTS.length) {
    return null
  }

  const MAPPED_TABS = TIERLISTS.map((tab) => (
    <TabsTrigger
      key={tab.id}
      value={`tab-${tab.id}`}
      className='relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary'
    >
      {tab.tier_category}
    </TabsTrigger>
  ))

  const MAPPED_CONTENT = TIERLISTS.map((content) => (
    <TabsContent
      key={content.id}
      value={`tab-${content.id}`}
    >
      <DeleteButton
        itemId={content.id}
        onDelete={deleteTierlist}
        className='absolute top-0 right-0'
      >
        <Trash2 />
      </DeleteButton>
      <TierRows rows={content.tiers} />
    </TabsContent>
  ))

  return (
    <Card className='p-6'>
      <Tabs
        value={tierTab}
        onValueChange={setTierTab}
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
