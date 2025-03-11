'use client'

import { TierCharacterListProps } from '@/app/(panel)/panel/tierlist/_components/tier-character-list/tier-character-list.type'
import { TierCharacterItem } from '@/app/(panel)/panel/tierlist/_components/tier-character-item'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { updateOrderTierlistCharacters } from '../../_services/update'
import { useDrag } from '@/features/hooks/use-drag'

export function TierCharacterList(props: TierCharacterListProps) {
  const { characters } = props

  const ITEMS = characters ??  []

  const { orderedItems, handleDragEnd } = useDrag({
    items: ITEMS,
    updateFn: updateOrderTierlistCharacters,
  })

  return (
    <SortableList
      items={orderedItems}
      onDragEnd={handleDragEnd}
      className='w-full grid grid-cols-5'
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <TierCharacterItem {...item} />
        </SortableList.Item>
      )}
    />
  )
}
